export function applyWeatherImpact(baseEnergy, weather) {
  let multiplier = 1;

  // Temperature impact
  if (weather.temperature < 0) multiplier += 0.4;
  else if (weather.temperature < 10) multiplier += 0.25;

  // Wind impact
  if (weather.wind === "head") multiplier += 0.15;
  if (weather.wind === "tail") multiplier -= 0.08;

  // HVAC impact
  if (weather.hvac) multiplier += 0.1;

  return baseEnergy * multiplier;
}

export function applyTrafficImpact(energy, traffic) {
  if (traffic === "medium") return energy * 1.08;
  if (traffic === "heavy") return energy * 1.18;
  return energy;
}

export function estimateBatteryDegradation({ fastCharges, depthOfDischarge }) {
  let sohImpact = 0.02;

  if (fastCharges > 2) sohImpact += 0.01;
  if (depthOfDischarge > 70) sohImpact += 0.01;

  let level = "Minimal";
  if (sohImpact > 0.03) level = "Moderate";
  if (sohImpact > 0.05) level = "Heavy";

  return { sohImpact, level };
}