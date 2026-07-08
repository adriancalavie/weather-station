import { z } from "zod";

export const GeocodingParams = z.object({
  cityName: z.string().min(1),
  country: z.string().optional(),
  state: z.string().optional(),
});
export type GeocodingParams = z.infer<typeof GeocodingParams>;

export const GeocodeResult = z.object({
  country: z.string(),
  lat: z.number(),
  lon: z.number(),
  local_names: z.record(z.string()).optional(),
  name: z.string(),
  state: z.string().optional(),
});
export type GeocodeResult = z.infer<typeof GeocodeResult>;

export const GeocodeResponse = z.array(GeocodeResult);
export type GeocodeResponse = z.infer<typeof GeocodeResponse>;
