import { z } from "zod";
import { Trip } from "../model/Trip.js";
import { ChargingStation } from "../model/ChargingStation.js";
import { geocodeAddress, fetchRoute } from "../utils/geoService.js";
import { simulateTripPlan } from "../utils/simulationEngine.js";
import {
  applyWeatherImpact,
  applyTrafficImpact,
  estimateBatteryDegradation,
} from "../utils/advancedSimulationEngine.js";

const planSchema = z.object({
  start: z.string().min(3),
  destination: z.string().min(3),
  vehicle: z.object({
    batteryCapacityKwh: z.number().positive(),
    efficiencyKmPerKwh: z.number().positive(),
    usableBatteryPercent: z.number().min(1).max(100),
    minimumReserveSocPercent: z.number().min(0).max(100),
  }),
  pricing: z
    .object({
      electricityRatePerKwh: z.number().positive(),
    })
    .optional(),
  weather: z
    .object({
      temperature: z.number().optional(),
      wind: z.string().optional(),
      hvac: z.boolean().optional(),
    })
    .optional(),
  traffic: z.string().optional(),
}).passthrough();

export async function planTrip(req, res) {
  try {
    console.log("[TRIP PLAN] Request received:", {
      start: req.body.start,
      destination: req.body.destination,
    });

    const parsed = planSchema.parse(req.body);

    const electricityRatePerKwh =
      parsed.pricing?.electricityRatePerKwh ??
      Number(process.env.DEFAULT_ELECTRICITY_RATE || 10);

    console.log("[GEO] Geocoding start:", parsed.start);
    const startCoord = await geocodeAddress(parsed.start);
    console.log("[GEO] Geocoding end:", parsed.destination);
    const endCoord = await geocodeAddress(parsed.destination);

    console.log("[ROUTE] Fetching route...");
    const route = await fetchRoute(startCoord, endCoord);
    console.log("[ROUTE] Route fetched:", { distanceKm: route.distanceKm });

    const stationsRaw = await ChargingStation.find().lean();
    console.log("[STATIONS] Found:", stationsRaw.length, "stations");
    
    if (!stationsRaw || stationsRaw.length === 0) {
      console.warn("[WARNING] No charging stations found in database!");
      return res.status(422).json({ 
        ok: false, 
        error: "No charging stations in database. Please seed the database first." 
      });
    }

    const stations = stationsRaw.map((s) => ({
      ...s,
      location: {
        lat: s.location.coordinates[1],
        lng: s.location.coordinates[0],
      },
    }));

    const result = simulateTripPlan({
      coordinatesLngLat: route.coordinatesLngLat,
      distanceKm: route.distanceKm,
      durationSec: route.durationSec,
      stations,
      vehicle: parsed.vehicle,
      electricityRatePerKwh,
      safetyFactor: Number(process.env.DEFAULT_SAFETY_FACTOR || 0.85),
      targetSocDefault: Number(process.env.DEFAULT_TARGET_SOC || 80),
      chargingPowerFallback: Number(
        process.env.DEFAULT_CHARGING_POWER_KW || 60,
      ),
    });

    if (!result.ok) {
      console.error("[SIMULATION] Failed:", result.error);
      return res.status(422).json({ ok: false, error: result.error });
    }
    
    console.log("[SIMULATION] Success - stops:", result.simulation.stops.length, "cost:", result.simulation.tripCost);
    const weatherAdjustedEnergy = applyWeatherImpact(
      result.simulation.totalEnergyKwh,
      req.body.weather || { temperature: 25 },
    );

    const trafficAdjustedEnergy = applyTrafficImpact(
      weatherAdjustedEnergy,
      req.body.traffic || "free",
    );

    const degradation = estimateBatteryDegradation({
      fastCharges: result.simulation.stops.length,
      depthOfDischarge: 80,
    });

    result.simulation.advanced = {
      weatherAdjustedEnergy,
      trafficAdjustedEnergy,
      batteryHealthImpact: degradation,
    };

    const responseData = {
      ok: true,
      input: {
        start: parsed.start,
        destination: parsed.destination,
        vehicle: parsed.vehicle,
        pricing: { electricityRatePerKwh },
        weather: req.body.weather || { temperature: 25, wind: "none", hvac: false },
        traffic: req.body.traffic || "free",
      },
      route: result.route,
      simulation: result.simulation,
    };
    
    console.log("[RESPONSE] Sending success response with route and simulation");
    return res.json(responseData);
  } catch (err) {
    console.error("[ERROR] Trip planning failed:", {
      name: err?.name,
      message: err?.message,
      stack: err?.stack,
    });

    if (err?.name === "ZodError") {
      const errorMessages = err.errors
        .map((e) => `${e.path.join(".")} - ${e.message}`)
        .join("; ");
      return res.status(400).json({ 
        ok: false, 
        error: `Validation error: ${errorMessages}` 
      });
    }

    const errorMessage =
      err?.message || "Trip planning failed";
    return res.status(500).json({ ok: false, error: errorMessage });
  }
}

export async function saveTrip(req, res) {
  try {
    const payload = req.body;
    const doc = await Trip.create(payload);
    res.status(201).json({ ok: true, tripId: doc._id });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
}

export async function listTrips(req, res) {
  const trips = await Trip.find().sort({ createdAt: -1 }).limit(20).lean();
  res.json({ ok: true, trips });
}

export async function getTrip(req, res) {
  const trip = await Trip.findById(req.params.id).lean();
  if (!trip)
    return res.status(404).json({ ok: false, error: "Trip not found" });
  res.json({ ok: true, trip });
}
