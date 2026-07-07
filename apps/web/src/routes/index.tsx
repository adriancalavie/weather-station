import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const HomeSearchSchema = z.object({
  city: z.string().optional(),
});

export const Route = createFileRoute("/")({
  validateSearch: HomeSearchSchema,
  component: Index,
  loaderDeps: ({ search: { city } }) => ({ city }),
  loader: async ({ abortController, deps: { city } }) => {
    if (!city) {
      return null;
    }

    const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`, {
      signal: abortController.signal,
    });

    if (!res.ok)
      throw new Response("Failed to load weather", { status: res.status });
    return res.json();
  },
});

function Index() {
  const weather = Route.useLoaderData();

  return (
    <div className="p-2">
      <h3>Welcome to Weather Station</h3>
      <form className="flex flex-col">
        <label htmlFor="cityInput">Enter yout city name</label>
        <input
          id="cityInput"
          type="text"
          required
          name="city"
          minLength={2}
          autoCapitalize="words"
          placeholder="New York"
          autoComplete="shipping address-level2"
        ></input>
        <output>
          {weather ? (
            <details>
              <summary>Result</summary>
              <pre>
                <code>{JSON.stringify(weather, null, 2)}</code>
              </pre>
            </details>
          ) : (
            <p>Enter a city to see weather data.</p>
          )}
        </output>
      </form>
    </div>
  );
}
