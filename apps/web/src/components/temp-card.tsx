import { WeatherResponse } from "shared";

type TempCardProps = {
  weather: WeatherResponse;
};

export default function TempCard({ weather }: TempCardProps) {
  return (
    <section className="w-full max-w-96 border">
      <h3>Weather in {weather.name}</h3>
      <div className="flex flex-col text-center">
        <code>{weather.main.temp}°C</code>
        <code>
          <small>Feels like {weather.main.feelsLike}°C</small>
        </code>
      </div>
    </section>
  );
}
