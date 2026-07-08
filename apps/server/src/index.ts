import "@/global";
import { compact, GeocodeResponse } from "shared";

import { buildGeocodingUrl, buildWeatherUrl } from "@/weather-api/url";

interface GeocodeResult {
  lat: number;
  lon: number;
}

function isGeocodeResponse(results: unknown): results is GeocodeResult[] {
  return (
    Array.isArray(results) &&
    results.every(
      (item) => typeof item === "object" && item !== null && "lat" in item && "lon" in item,
    )
  );
}

const server = Bun.serve({
  port: 3001,
  routes: {
    "/api/geocode": async () => {
      const geocodeUrl = buildGeocodingUrl(
        { cityName: "Bucharest", country: "RO" },
        process.env.OWA_API_KEY,
      );
      const geoRes = await fetch(geocodeUrl);
      return Response.json(GeocodeResponse.parse(await geoRes.json()));
    },
    "/api/weather": async (req) => {
      const url = new URL(req.url);
      const cityName = url.searchParams.get("city");
      const state = url.searchParams.get("state");
      const country = url.searchParams.get("country");

      if (!cityName) {
        return Response.json({ error: "City name is required" }, { status: 400 });
      }

      const geocodeUrl = buildGeocodingUrl(
        { cityName, ...compact({ country, state }) },
        process.env.OWA_API_KEY,
      );
      const r = await fetch(geocodeUrl);
      const results = await r.json();

      if (!isGeocodeResponse(results)) {
        return Response.json({ error: "Invalid geocoding response" }, { status: 500 });
      }

      if (results.length === 0) {
        return Response.json({ error: "City not found" }, { status: 404 });
      }
      const { lat, lon } = results[0];

      const weatherUrl = buildWeatherUrl(lat, lon, process.env.OWA_API_KEY);
      const res = await fetch(weatherUrl);
      return Response.json(await res.json());
    },
  },
});

console.log(`Server running on ${server.url}`);
