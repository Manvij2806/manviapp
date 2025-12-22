import { Cloud, Sun, Droplets, Wind, CloudRain, CloudSnow, CloudLightning, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  wind: number;
  high: number;
  low: number;
  weatherCode: number;
}

const getWeatherCondition = (code: number): string => {
  if (code === 0) return 'Clear Sky';
  if (code <= 3) return 'Partly Cloudy';
  if (code <= 49) return 'Foggy';
  if (code <= 59) return 'Drizzle';
  if (code <= 69) return 'Rain';
  if (code <= 79) return 'Snow';
  if (code <= 99) return 'Thunderstorm';
  return 'Unknown';
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Default to Bangalore, India - you can change these coordinates
        const lat = 12.9716;
        const lon = 77.5946;
        
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
        );
        
        if (!response.ok) throw new Error('Failed to fetch weather');
        
        const data = await response.json();
        
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          condition: getWeatherCondition(data.current.weather_code),
          humidity: data.current.relative_humidity_2m,
          wind: Math.round(data.current.wind_speed_10m),
          high: Math.round(data.daily.temperature_2m_max[0]),
          low: Math.round(data.daily.temperature_2m_min[0]),
          weatherCode: data.current.weather_code,
        });
      } catch (err) {
        setError('Weather unavailable');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun className="w-8 h-8 text-weather" />;
    if (code <= 3) return (
      <div className="relative">
        <Sun className="w-8 h-8 text-weather" />
        <Cloud className="w-5 h-5 text-muted-foreground absolute -bottom-1 -right-1" />
      </div>
    );
    if (code <= 59) return <Cloud className="w-8 h-8 text-muted-foreground" />;
    if (code <= 69) return <CloudRain className="w-8 h-8 text-weather" />;
    if (code <= 79) return <CloudSnow className="w-8 h-8 text-weather" />;
    if (code <= 99) return <CloudLightning className="w-8 h-8 text-weather" />;
    return <Cloud className="w-8 h-8 text-muted-foreground" />;
  };

  if (loading) {
    return (
      <div className="dashboard-card h-full flex flex-col items-center justify-center">
        <Loader2 className="w-6 h-6 text-weather animate-spin" />
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="dashboard-card h-full flex flex-col items-center justify-center">
        <Cloud className="w-6 h-6 text-muted-foreground" />
        <span className="text-[9px] text-muted-foreground mt-1">{error}</span>
      </div>
    );
  }

  return (
    <div className="dashboard-card h-full flex flex-col">
      <div className="card-header flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-weather" />
        WEATHER
      </div>
      
      <div className="flex items-center justify-between flex-1">
        <div className="flex items-center gap-2">
          {getWeatherIcon(weather.weatherCode)}
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
