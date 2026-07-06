import { z } from "zod";

export const GeocodingParams = z.object({
  cityName: z.string().min(1),
  state: z.string().optional(),
  country: z.string().optional(),
});
export type GeocodingParams = z.infer<typeof GeocodingParams>;

export const GeocodeResult = z.object({
  name: z.string(),
  local_names: z.record(z.string()).optional(),
  lat: z.number(),
  lon: z.number(),
  country: z.string(),
  state: z.string().optional(),
});
export type GeocodeResult = z.infer<typeof GeocodeResult>;

export const GeocodeResponse = z.array(GeocodeResult);
export type GeocodeResponse = z.infer<typeof GeocodeResponse>;
