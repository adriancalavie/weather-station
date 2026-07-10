import { z } from "zod";

export const WeatherResponse = z.object({
  main: z
    .object({
      feels_like: z.number(),
      temp: z.number(),
    })
    .transform(({ feels_like, ...rest }) => ({
      feelsLike: feels_like,
      ...rest,
    })),
  name: z.string(),
});
export type WeatherResponse = z.infer<typeof WeatherResponse>;
