const units: "imperial" | "metric" = "metric";

export function buildWeatherUrl(lat: number, lon: number, key: string): string {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${key}`;
}

export function buildGeocodingUrl(
  location: {
    cityName: string;
    state?: string;
    country?: string;
  },
  key: string,
) {
  const queryParams = Object.values(location).join(",");
  return `http://api.openweathermap.org/geo/1.0/direct?q=${queryParams}&limit=5&appid=${key}`;
}
