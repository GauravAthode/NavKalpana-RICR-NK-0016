export async function geocodeAddress(address) {
  try {
    const url =
      "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" +
      encodeURIComponent(address);

    const resp = await fetch(url, {
      headers: {
        "User-Agent": "VoltPathHackathon/1.0",
      },
    });

    if (!resp.ok) throw new Error(`Geocoding service error: HTTP ${resp.status}`);

    const data = await resp.json();
    if (!data?.length) throw new Error(`Location not found: "${address}". Try a larger city/state name like "Bhopal, Madhya Pradesh"`);

    return { lat: Number(data[0].lat), lng: Number(data[0].lon) };
  } catch (err) {
    console.error("[GEOCODE ERROR]", address, err.message);
    throw err;
  }
}

export async function fetchRoute(start, end) {
  try {
    const url =
      "https://router.project-osrm.org/route/v1/driving/" +
      `${start.lng},${start.lat};${end.lng},${end.lat}` +
      "?overview=full&geometries=geojson";

    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Routing service error: HTTP ${resp.status}`);

    const json = await resp.json();
    if (json.code !== "Ok") throw new Error(`Route error: ${json.message || "No route found"}`);
    
    const route = json?.routes?.[0];
    if (!route) throw new Error("No valid route found between locations");

    return {
      distanceKm: route.distance / 1000,
      durationSec: route.duration,
      coordinatesLngLat: route.geometry.coordinates,
    };
  } catch (err) {
    console.error("[ROUTE ERROR]", err.message);
    throw err;
  }
}
