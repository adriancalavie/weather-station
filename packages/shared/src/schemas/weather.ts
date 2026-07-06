import { z } from "zod";

export const WeatherResponse = z.object({
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
  }),
  name: z.string(),
});
export type WeatherResponse = z.infer<typeof WeatherResponse>;
