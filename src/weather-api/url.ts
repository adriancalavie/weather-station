const units: "imperial" | "metric" = "metric";

export default function buildUrl(lat: number, lon: number): string {
  return `https://api.openweathermap.org/data/4.0/onecall/current?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.VITE_OWA_API_KEY}`;
}
