import { Cloud, Sun, Droplets, Wind } from 'lucide-react';

const WeatherWidget = () => {
  // Mock weather data - in production, fetch from API
  const weather = {
    temp: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    wind: 12,
    high: 32,
    low: 24,
  };

  return (
    <div className="dashboard-card h-full flex flex-col">
      <div className="card-header flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-weather" />
        WEATHER
      </div>
      
      <div className="flex items-center justify-between flex-1">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Sun className="w-8 h-8 text-weather" />
            <Cloud className="w-5 h-5 text-muted-foreground absolute -bottom-1 -right-1" />
          </div>
          <div>
            <div className="weather-temp text-3xl glow-weather">{weather.temp}°</div>
            <div className="text-[9px] text-muted-foreground">{weather.condition}</div>
          </div>
        </div>

        <div className="flex flex-col gap-1 text-[9px]">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Droplets className="w-3 h-3" />
            <span>{weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Wind className="w-3 h-3" />
            <span>{weather.wind} km/h</span>
          </div>
          <div className="text-foreground/70">
            H:{weather.high}° L:{weather.low}°
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
