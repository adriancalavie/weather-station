import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { WeatherResponse } from "shared";
import { z } from "zod";

import TempCard from "@/components/temp-card";

const HomeSearchSchema = z.object({
  city: z.string().optional(),
});

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: HomeSearchSchema,
  loaderDeps: ({ search: { city } }) => ({ city }),
  loader: async ({ abortController, deps: { city } }) => {
    if (!city) {
      return null;
    }

    const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`, {
      signal: abortController.signal,
    });

    if (!res.ok) throw new Response("Failed to load weather", { status: res.status });
    return WeatherResponse.parse(await res.json());
  },
});

function Index() {
  const weather = Route.useLoaderData();
  const { city } = Route.useSearch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const raw = Object.fromEntries(formData);
    const result = HomeSearchSchema.safeParse(raw);

    if (result.success) {
      navigate({ search: result.data, to: "/" });
    }
  };

  return (
    <div className="p-2">
      <h2>Welcome to Weather Station</h2>
      <search>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="cityInput">Enter yout city name</label>
          <input
            autoCapitalize="words"
            autoComplete="shipping address-level2"
            defaultValue={city ?? ""}
            id="cityInput"
            minLength={2}
            name="city"
            placeholder="New York"
            required
            type="text"
          ></input>
          <output>
            {weather ? <TempCard weather={weather} /> : <p>Enter a city to see weather data.</p>}
          </output>
        </form>
      </search>
    </div>
  );
}
