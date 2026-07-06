import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  loader: async ({ abortController }) => {
    const res = await fetch(`/api/weather?city=Bucharest`, {
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
      <h3>Welcome Home!</h3>
      <pre>
        <code>{JSON.stringify(weather, null, 2)}</code>
      </pre>
    </div>
  );
}
