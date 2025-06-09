"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, CloudSun, Sun, Thermometer, Wind, Droplets } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface WeatherDay {
  day: string;
  tempHigh: number;
  tempLow: number;
  description: string;
  icon: WeatherIconType;
  windSpeed?: number;
  rainChance?: number;
}

type WeatherIconType = 
  | "SUNNY" | "MOSTLY_SUNNY" | "CLOUDY" | "RAIN" | "DRIZZLE" 
  | "THUNDERSTORM" | "SNOW" | "FOG";

const weatherIconMap: Record<WeatherIconType, LucideIcon> = {
  SUNNY: Sun,
  MOSTLY_SUNNY: CloudSun,
  CLOUDY: Cloud,
  RAIN: CloudRain,
  DRIZZLE: CloudDrizzle,
  THUNDERSTORM: CloudLightning,
  SNOW: CloudSnow,
  FOG: CloudFog,
};

interface WeatherCardProps {
  currentWeather: {
    location: string;
    temperature: number;
    description: string;
    icon: WeatherIconType;
    humidity?: number;
    windSpeed?: number;
  };
  forecast: WeatherDay[];
}

export function WeatherCard({ currentWeather, forecast }: WeatherCardProps) {
  const CurrentWeatherIcon = weatherIconMap[currentWeather.icon] || Cloud;

  return (
    <Card className="shadow-lg col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Weather - {currentWeather.location}</CardTitle>
        <CardDescription>Current conditions and 5-day forecast</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6 mb-6 pb-6 border-b">
          <div className="flex items-center gap-4">
            <CurrentWeatherIcon className="w-16 h-16 text-accent" />
            <div>
              <p className="text-5xl font-bold text-primary">{currentWeather.temperature}°C</p>
              <p className="text-muted-foreground">{currentWeather.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {currentWeather.humidity !== undefined && (
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-muted-foreground" />
                <span>Humidity: {currentWeather.humidity}%</span>
              </div>
            )}
            {currentWeather.windSpeed !== undefined && (
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-muted-foreground" />
                <span>Wind: {currentWeather.windSpeed} km/h</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {forecast.map((day) => {
            const IconComponent = weatherIconMap[day.icon] || Cloud;
            return (
              <div key={day.day} className="flex flex-col items-center p-3 bg-background/50 rounded-lg shadow">
                <p className="font-semibold text-sm">{day.day}</p>
                <IconComponent className="w-10 h-10 my-2 text-accent" />
                <p className="text-lg font-bold">{day.tempHigh}°<span className="text-muted-foreground">/{day.tempLow}°</span></p>
                <p className="text-xs text-muted-foreground text-center mt-1">{day.description}</p>
                {day.rainChance !== undefined && (
                  <div className="flex items-center gap-1 text-xs text-blue-500 mt-1">
                    <CloudRain className="w-3 h-3"/> {day.rainChance}%
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
