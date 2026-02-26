import dotenv from "dotenv";
import mongoose from "mongoose";
import { ChargingStation } from "../model/ChargingStation.js";

dotenv.config();

// Helper function to generate stations with slight coordinate variations
function generateStationsInCity(cityName, baseLat, baseLng, count, basepower = 80) {
  const stationsInCity = [];
  const powerOptions = [60, 80, 100, 120, 150];
  
  for (let i = 0; i < count; i++) {
    const variation = 0.02; // roughly 2km variation
    const lat = baseLat + (Math.random() - 0.5) * variation;
    const lng = baseLng + (Math.random() - 0.5) * variation;
    const power = powerOptions[Math.floor(Math.random() * powerOptions.length)];
    
    stationsInCity.push({
      name: `VoltPath ${cityName} ${i + 1}`,
      address: `${cityName} - Station ${i + 1}`,
      location: { type: "Point", coordinates: [lng, lat] },
      powerKw: power
    });
  }
  return stationsInCity;
}

// Helper for highway corridor stations
function generateHighwayCorridor(startLat, startLng, endLat, endLng, corridorName, stationCount = 15) {
  const stations = [];
  for (let i = 1; i <= stationCount; i++) {
    const ratio = i / (stationCount + 1);
    const lat = startLat + (endLat - startLat) * ratio;
    const lng = startLng + (endLng - startLng) * ratio;
    const power = [80, 100, 120, 150][Math.floor(Math.random() * 4)]; // Highway stations have more power
    
    stations.push({
      name: `${corridorName} Stop ${i}`,
      address: `${corridorName} Highway - ${i}`,
      location: { type: "Point", coordinates: [lng, lat] },
      powerKw: power
    });
  }
  return stations;
}

const stations = [];

// TIER-1 METRO CITIES - Multiple stations (20-30 each)
stations.push(...generateStationsInCity("Mumbai", 19.0760, 72.8777, 30, 150));
stations.push(...generateStationsInCity("Delhi", 28.7041, 77.1025, 28, 150));
stations.push(...generateStationsInCity("Bangalore", 12.9716, 77.5946, 25, 120));
stations.push(...generateStationsInCity("Hyderabad", 17.3850, 78.4867, 20, 120));
stations.push(...generateStationsInCity("Pune", 18.5204, 73.8567, 22, 120));
stations.push(...generateStationsInCity("Kolkata", 22.5726, 88.3639, 18, 120));
stations.push(...generateStationsInCity("Chennai", 13.0827, 80.2707, 20, 120));

// TIER-2 CITIES - 10-15 stations each
stations.push(...generateStationsInCity("Indore", 22.7196, 75.8577, 15, 100));
stations.push(...generateStationsInCity("Ahmedabad", 23.0225, 72.5714, 18, 100));
stations.push(...generateStationsInCity("Bhopal", 23.2599, 77.4126, 14, 100));
stations.push(...generateStationsInCity("Chandigarh", 30.7333, 76.7794, 12, 100));
stations.push(...generateStationsInCity("Jaipur", 26.9124, 75.7873, 16, 100));
stations.push(...generateStationsInCity("Lucknow", 26.8467, 80.9462, 14, 100));
stations.push(...generateStationsInCity("Surat", 21.1702, 72.8311, 15, 100));
stations.push(...generateStationsInCity("Nagpur", 21.1458, 79.0882, 12, 80));
stations.push(...generateStationsInCity("Kochi", 9.9312, 76.2673, 12, 80));
stations.push(...generateStationsInCity("Vadodara", 22.3072, 73.1812, 10, 80));
stations.push(...generateStationsInCity("Coimbatore", 11.0168, 76.9558, 12, 80));
stations.push(...generateStationsInCity("Visakhapatnam", 17.6868, 83.2185, 10, 80));
stations.push(...generateStationsInCity("Ludhiana", 30.9009, 75.8573, 11, 80));
stations.push(...generateStationsInCity("Kanpur", 26.4499, 80.3319, 9, 80));
stations.push(...generateStationsInCity("Gwalior", 26.2183, 78.1828, 9, 80));

// TIER-3 CITIES - 5-10 stations each (50+ tier-3 cities)
const tier3Cities = [
  { name: "Mysuru", lat: 12.2958, lng: 76.6394 },
  { name: "Bhubaneswar", lat: 20.2961, lng: 85.8245 },
  { name: "Udaipur", lat: 24.5854, lng: 73.7125 },
  { name: "Nashik", lat: 19.9975, lng: 73.7898 },
  { name: "Pimpri-Chinchwad", lat: 18.6298, lng: 73.7997 },
  { name: "Kota", lat: 25.2138, lng: 75.8648 },
  { name: "Varanasi", lat: 25.3176, lng: 82.9739 },
  { name: "Jammu", lat: 32.7266, lng: 75.3420 },
  { name: "Dehradun", lat: 30.3165, lng: 78.0322 },
  { name: "Patna", lat: 25.5941, lng: 85.1376 },
  { name: "Ranchi", lat: 23.3441, lng: 85.3096 },
  { name: "Trivandrum", lat: 8.5241, lng: 76.9366 },
  { name: "Madurai", lat: 9.9252, lng: 78.1198 },
  { name: "Hubli", lat: 15.3647, lng: 75.1240 },
  { name: "Vijayawada", lat: 16.5062, lng: 80.6480 },
  { name: "Raipur", lat: 21.2514, lng: 81.6296 },
  { name: "Aurangabad", lat: 19.8762, lng: 75.3433 },
  { name: "Sangli", lat: 16.8633, lng: 74.5701 },
  { name: "Solapur", lat: 17.6773, lng: 75.9241 },
  { name: "Moradabad", lat: 28.8385, lng: 77.7597 },
  { name: "Agra", lat: 27.1767, lng: 78.0081 },
  { name: "Meerut", lat: 28.9845, lng: 77.7064 },
  { name: "Ghaziabad", lat: 28.6692, lng: 77.4538 },
  { name: "Bareilly", lat: 28.3670, lng: 79.4304 },
  { name: "Aligarh", lat: 27.8974, lng: 77.8947 },
  { name: "Gorakhpur", lat: 26.7606, lng: 83.3732 },
  { name: "Malegaon", lat: 20.5549, lng: 74.6299 },
  { name: "Latur", lat: 18.4088, lng: 76.2303 },
  { name: "Davanagere", lat: 14.4644, lng: 75.9289 },
  { name: "Belgaum", lat: 15.8497, lng: 75.6193 },
  { name: "Udupi", lat: 13.3344, lng: 74.7421 },
  { name: "Mangalore", lat: 12.8674, lng: 74.8326 },
  { name: "Thrissur", lat: 10.5276, lng: 76.2144 },
  { name: "Ernakulam", lat: 9.9312, lng: 76.2673 },
  { name: "Salem", lat: 11.6643, lng: 78.1460 },
  { name: "Tiruppur", lat: 11.1085, lng: 77.3411 },
  { name: "Trichy", lat: 10.8069, lng: 78.7047 },
  { name: "Tenali", lat: 14.1045, lng: 79.6296 },
  { name: "Kakinada", lat: 16.9891, lng: 82.2475 },
  { name: "Rajahmundry", lat: 16.9933, lng: 81.7851 },
  { name: "Amritsar", lat: 31.6340, lng: 74.8723 },
  { name: "Jalandhar", lat: 31.8260, lng: 75.5762 },
  { name: "Indraprastha", lat: 28.4089, lng: 77.2846 },
  { name: "Panipat", lat: 29.3909, lng: 76.9635 },
  { name: "Hisar", lat: 29.1492, lng: 75.7217 },
  { name: "Rohtak", lat: 28.8955, lng: 77.0539 },
  { name: "Ajmer", lat: 26.4499, lng: 74.6399 },
  { name: "Jodhpur", lat: 26.2389, lng: 73.0243 },
  { name: "Bikaner", lat: 28.0229, lng: 71.8297 },
  { name: "Allahabad", lat: 25.4358, lng: 81.8463 },
  { name: "Mau", lat: 25.9489, lng: 82.6431 },
  { name: "Guwahati", lat: 26.1445, lng: 91.7362 },
];

tier3Cities.forEach(city => {
  const stationCount = Math.floor(Math.random() * 5) + 5; // 5-10 stations
  stations.push(...generateStationsInCity(city.name, city.lat, city.lng, stationCount, 80));
});

// MAJOR HIGHWAY CORRIDORS - 15-20 stations each
// Delhi-Mumbai Highway (NH-44)
stations.push(...generateHighwayCorridor(28.7041, 77.1025, 19.0760, 72.8777, "NH-44 Delhi-Mumbai", 20));

// Mumbai-Bangalore Highway (NH-48)
stations.push(...generateHighwayCorridor(19.0760, 72.8777, 12.9716, 77.5946, "NH-48 Mumbai-Bangalore", 25));

// Delhi-Bangalore Highway (NH-7)
stations.push(...generateHighwayCorridor(28.7041, 77.1025, 12.9716, 77.5946, "NH-7 Delhi-Bangalore", 20));

// Pune-Goa Highway (NH-4)
stations.push(...generateHighwayCorridor(18.5204, 73.8567, 15.4909, 73.8278, "NH-4 Pune-Goa", 15));

// Chennai-Bangalore Highway (NH-44)
stations.push(...generateHighwayCorridor(13.0827, 80.2707, 12.9716, 77.5946, "NH-44 Chennai-Bangalore", 15));

// Kolkata-Mumbai Highway (NH-6)
stations.push(...generateHighwayCorridor(22.5726, 88.3639, 19.0760, 72.8777, "NH-6 Kolkata-Mumbai", 20));

// Delhi-Kolkata Highway (NH-2)
stations.push(...generateHighwayCorridor(28.7041, 77.1025, 22.5726, 88.3639, "NH-2 Delhi-Kolkata", 20));

// Hyderabad-Bangalore Highway
stations.push(...generateHighwayCorridor(17.3850, 78.4867, 12.9716, 77.5946, "Hyderabad-Bangalore", 18));

// Chandigarh-Delhi Highway
stations.push(...generateHighwayCorridor(30.7333, 76.7794, 28.7041, 77.1025, "Chandigarh-Delhi", 12));

// Ahmedabad-Mumbai Highway
stations.push(...generateHighwayCorridor(23.0225, 72.5714, 19.0760, 72.8777, "Ahmedabad-Mumbai", 12));

// Surat-Mumbai Highway
stations.push(...generateHighwayCorridor(21.1702, 72.8311, 19.0760, 72.8777, "Surat-Mumbai", 10));

// Pune-Nashik-Aurangabad Highway
stations.push(...generateHighwayCorridor(18.5204, 73.8567, 19.8762, 75.3433, "Pune-Nashik-Aurangabad", 14));

// Bangalore-Pune Highway
stations.push(...generateHighwayCorridor(12.9716, 77.5946, 18.5204, 73.8567, "Bangalore-Pune", 18));

// Hyderabad-Chennai Highway
stations.push(...generateHighwayCorridor(17.3850, 78.4867, 13.0827, 80.2707, "Hyderabad-Chennai", 16));

// Coimbatore-Kochi Highway
stations.push(...generateHighwayCorridor(11.0168, 76.9558, 9.9312, 76.2673, "Coimbatore-Kochi", 10));

// Agra-Lucknow Highway
stations.push(...generateHighwayCorridor(27.1767, 78.0081, 26.8467, 80.9462, "Agra-Lucknow", 12));

// Ludhiana-Chandigarh Highway
stations.push(...generateHighwayCorridor(30.9009, 75.8573, 30.7333, 76.7794, "Ludhiana-Chandigarh", 8));

// Jaipur-Agra Highway
stations.push(...generateHighwayCorridor(26.9124, 75.7873, 27.1767, 78.0081, "Jaipur-Agra", 10));

// Indore-Bhopal Highway
stations.push(...generateHighwayCorridor(22.7196, 75.8577, 23.2599, 77.4126, "Indore-Bhopal", 10));

// Additional city extensions for smaller cities
const smallerCities = [
  { name: "Amravati", lat: 20.8530, lng: 77.7533 },
  { name: "Yavatmal", lat: 20.4078, lng: 78.1343 },
  { name: "Nandurbar", lat: 21.3814, lng: 74.2498 },
  { name: "Dhulia", lat: 20.9091, lng: 74.7701 },
  { name: "Burhanpur", lat: 21.3000, lng: 76.2300 },
  { name: "Ujjain", lat: 23.1815, lng: 75.7839 },
  { name: "Khargone", lat: 21.8041, lng: 75.4504 },
  { name: "Itarsi", lat: 22.5076, lng: 77.7250 },
  { name: "Sehore", lat: 23.0097, lng: 77.7094 },
  { name: "Raisen", lat: 23.5069, lng: 77.6872 },
  { name: "Guntur", lat: 16.3067, lng: 80.4365 },
  { name: "Nellore", lat: 14.4305, lng: 79.9864 },
  { name: "Tirupati", lat: 13.2059, lng: 79.8969 },
  { name: "Ananthapur", lat: 13.6355, lng: 77.6052 },
  { name: "Eluru", lat: 16.7142, lng: 81.0931 },
  { name: "Vizianagaram", lat: 18.1267, lng: 83.4297 },
  { name: "Srikakulam", lat: 18.2883, lng: 83.8903 },
  { name: "Dhanbad", lat: 23.7957, lng: 86.4304 },
  { name: "Asansol", lat: 23.6836, lng: 86.9650 },
  { name: "Durgapur", lat: 23.8103, lng: 87.3137 },
];

smallerCities.forEach(city => {
  const stationCount = Math.floor(Math.random() * 4) + 3; // 3-7 stations
  stations.push(...generateStationsInCity(city.name, city.lat, city.lng, stationCount, 60));
});

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  await ChargingStation.deleteMany({});
  await ChargingStation.insertMany(stations);
  console.log("✅ Seeded charging stations:", stations.length);
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});