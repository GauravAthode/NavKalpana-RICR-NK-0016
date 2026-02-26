import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import GlassCard from "./GlassCard.jsx";
import L from "leaflet";

import { haversineMeters, bearing } from "../utils/navigation.js";

// icon used for generic stops/pins
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// component responsible for locking/unlocking map interactions
function MapInteractionManager({ navigationActive, baseZoom }) {
  const map = useMap();

  useEffect(() => {
    if (navigationActive && map) {
      map.setZoom(baseZoom);
      map.options.minZoom = baseZoom;
      map.options.maxZoom = baseZoom;
      map.scrollWheelZoom.disable();
      map.doubleClickZoom.disable();
      map.touchZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
      map.dragging.disable();
    } else if (map) {
      // restore default behaviour when navigation ends
      map.options.minZoom = 0;
      map.options.maxZoom = 18;
      map.scrollWheelZoom.enable();
      map.doubleClickZoom.enable();
      map.touchZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
      map.dragging.enable();
    }
  }, [navigationActive, baseZoom, map]);

  return null;
}

export default function MapView({ planResult }) {
  const coords = planResult.route.geometry.coordinates;
  const latLng = coords.map(([lng, lat]) => [lat, lng]);
  const startLocation = latLng[0];
  const destinationLocation = latLng[latLng.length - 1];

  const center = latLng[Math.floor(latLng.length / 2)] || [23.2599, 77.4126];
  const stops = planResult.simulation.stops || [];

  const [map, setMap] = useState(null);
  const [navigationActive, setNavigationActive] = useState(false);
  const [userPos, setUserPos] = useState(null);
  const [heading, setHeading] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [remainingRoute, setRemainingRoute] = useState(latLng);
  const watchIdRef = useRef(null);
  const prevPosRef = useRef(null);
  const prevTimeRef = useRef(null);
  const baseZoomRef = useRef(10);

  const startIcon = L.divIcon({
    className: "start-marker",
    html: `<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  const destIcon = L.divIcon({
    className: "dest-marker",
    html: `<div class="w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  const userIcon = L.divIcon({
    className: "user-arrow-icon",
    html: `<div style="transform: rotate(${heading}deg);">
             <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"#007aff\" width=\"24\" height=\"24\">
               <path d=\"M12 2L15 11H12V22L9 11H12L12 2Z\"/>
             </svg>
           </div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

  const updateRemainingRoute = (position) => {
    let bestIndex = 0;
    let minDist = Infinity;
    for (let i = 0; i < remainingRoute.length; i++) {
      const d = haversineMeters(position, remainingRoute[i]);
      if (d < minDist) {
        minDist = d;
        bestIndex = i;
      }
    }
    setRemainingRoute((prev) => prev.slice(bestIndex));
  };

  const onPositionUpdate = (pos) => {
    const { latitude, longitude } = pos.coords;
    const now = Date.now();
    const newPos = [latitude, longitude];

    if (prevPosRef.current && prevTimeRef.current) {
      const dt = (now - prevTimeRef.current) / 1000;
      const dist = haversineMeters(prevPosRef.current, newPos);
      const sp = dt > 0 ? (dist / dt) * 3.6 : 0;
      setSpeed(sp);
      setHeading(bearing(prevPosRef.current, newPos));
    }

    prevPosRef.current = newPos;
    prevTimeRef.current = now;
    setUserPos(newPos);
    updateRemainingRoute(newPos);

    if (map) {
      map.setView(newPos, map.getZoom());
    }
  };

  const handleOrientation = (e) => {
    let h = null;
    if (e.absolute && e.alpha != null) {
      h = e.alpha;
    } else if (e.webkitCompassHeading) {
      h = e.webkitCompassHeading;
    }
    if (h != null) {
      setHeading(360 - h);
    }
  };

  const startNavigation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not available in this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const now = Date.now();
        const initial = [latitude, longitude];
        prevPosRef.current = initial;
        prevTimeRef.current = now;
        setUserPos(initial);
        setRemainingRoute(latLng);
        setNavigationActive(true);
        if (!map) {
          baseZoomRef.current = map.getZoom();
        }

        const id = navigator.geolocation.watchPosition(
          onPositionUpdate,
          (err) => {
            console.error("watchPosition error", err);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 10000,
          },
        );
        watchIdRef.current = id;
      },
      (err) => {
        console.error("initial position error", err);
      },
      { enableHighAccuracy: true },
    );

    window.addEventListener(
      "deviceorientationabsolute",
      handleOrientation,
      true,
    );
    window.addEventListener("deviceorientation", handleOrientation, true);
  };

  const stopNavigation = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    window.removeEventListener(
      "deviceorientationabsolute",
      handleOrientation,
      true,
    );
    window.removeEventListener("deviceorientation", handleOrientation, true);
    setNavigationActive(false);
    setUserPos(null);
    setHeading(0);
    setSpeed(0);
    setRemainingRoute(latLng);
  };

  useEffect(() => {
    if (map && navigationActive) {
      // interactions managed by child component
    }
  }, [map, navigationActive]);

  return (
    <GlassCard className="p-0 overflow-hidden relative">
      <div className="px-5 pt-5">
        <div className="flex justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Route Map</h2>
          </div>
          <div>
            {!navigationActive && (
              <button
                onClick={startNavigation}
                className="relative bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50 shadow-lg cursor-pointer hover:bg-blue-800"
              >
                Start Navigation
              </button>
            )}
            {navigationActive && (
              <div className="absolute top-4 left-14 bg-black bg-opacity-50 text-white px-3 py-1 rounded z-50 flex items-center space-x-2 ">
                <span>Speed: {speed.toFixed(1)} km/h</span>
                <button
                  onClick={stopNavigation}
                  className="text-red-400 underline"
                >
                  Stop
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 h-96 w-full relative">
        <MapContainer
          center={center}
          zoom={10}
          whenCreated={setMap}
          className="h-full w-full"
        >
          <MapInteractionManager
            navigationActive={navigationActive}
            baseZoom={baseZoomRef.current}
          />

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Polyline positions={navigationActive ? remainingRoute : latLng} />

          <Marker position={startLocation} icon={startIcon} />
          <Marker position={destinationLocation} icon={destIcon} />

          {userPos && <Marker position={userPos} icon={userIcon} />}

          {stops.map((s, idx) => (
            <Marker
              key={idx}
              position={[s.location.lat, s.location.lng]}
              icon={markerIcon}
            >
              <Popup>
                <div className="text-sm font-semibold">{s.name}</div>
                <div className="text-xs">Arrival SoC: {s.arrivalSoc}%</div>
                <div className="text-xs">Target SoC: {s.targetSoc}%</div>
                <div className="text-xs">
                  Energy Added: {s.energyAddedKwh} kWh
                </div>
                <div className="text-xs">Time: {s.chargingTimeMin} min</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </GlassCard>
  );
}
