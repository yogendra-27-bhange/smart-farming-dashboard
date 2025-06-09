"use client";

import { SensorCard } from "@/components/dashboard/sensor-card";
import { WeatherCard } from "@/components/dashboard/weather-card";
import { AlertItem } from "@/components/dashboard/alert-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Thermometer, Sun, Waves, Bell, AreaChart, Lightbulb } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from 'react';

// Mock Data
const mockSensorData = [
  { title: "Soil Moisture", value: 65, unit: "%", description: "Sector A - Loamy Soil", icon: Droplets, trendData: [{time: "00:00", value: 60}, {time: "01:00", value: 62}, {time: "02:00", value: 65}, {time: "03:00", value: 63}, {time: "04:00", value: 65}], color: "190 70% 50%" }, // blueish
  { title: "Air Temperature", value: 28, unit: "°C", description: "Greenhouse 1", icon: Thermometer, trendData: [{time: "00:00", value: 25}, {time: "01:00", value: 26}, {time: "02:00", value: 28}, {time: "03:00", value: 27}, {time: "04:00", value: 28}], color: "30 90% 60%" }, // orangish
  { title: "Humidity", value: 72, unit: "%", description: "Farm Ambient", icon: Sun, trendData: [{time: "00:00", value: 70}, {time: "01:00", value: 71}, {time: "02:00", value: 72}, {time: "03:00", value: 73}, {time: "04:00", value: 72}], color: "50 80% 65%" }, // yellowish
  { title: "Water Level", value: 80, unit: "%", description: "Main Reservoir", icon: Waves, trendData: [{time: "00:00", value: 85}, {time: "01:00", value: 83}, {time: "02:00", value: 82}, {time: "03:00", value: 80}, {time: "04:00", value: 80}], color: "210 70% 55%" }, // blue
];

const mockCurrentWeather = {
  location: "My Farm",
  temperature: 28,
  description: "Mostly Sunny",
  icon: "MOSTLY_SUNNY" as const,
  humidity: 72,
  windSpeed: 15,
};

const mockForecast = [
  { day: "Mon", tempHigh: 30, tempLow: 22, description: "Sunny", icon: "SUNNY" as const, rainChance: 10 },
  { day: "Tue", tempHigh: 29, tempLow: 21, description: "Cloudy", icon: "CLOUDY" as const, rainChance: 20 },
  { day: "Wed", tempHigh: 27, tempLow: 20, description: "Light Rain", icon: "DRIZZLE" as const, rainChance: 60 },
  { day: "Thu", tempHigh: 31, tempLow: 23, description: "Sunny", icon: "SUNNY" as const, rainChance: 5 },
  { day: "Fri", tempHigh: 28, tempLow: 22, description: "Thunderstorms", icon: "THUNDERSTORM" as const, rainChance: 70 },
];

const initialMockAlerts = [
  { id: "1", title: "Low Soil Moisture", message: "Sector A soil moisture is at 35%. Irrigation recommended.", severity: "warning" as const, timestamp: "2 hours ago" },
  { id: "2", title: "Rain Expected", message: "Heavy rain forecasted for tomorrow afternoon. Consider harvesting sensitive crops.", severity: "info" as const, timestamp: "1 day ago" },
  { id: "3", title: "High Temperature", message: "Greenhouse temperature reached 35°C. Ventilation activated.", severity: "error" as const, timestamp: "30 mins ago" },
];


export default function DashboardPage() {
  const [alerts, setAlerts] = useState(initialMockAlerts);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const dismissAlert = (id: string) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  };
  
  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-theme(space.24))]">
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold font-headline text-primary">Farm Overview</h1>
      
      <section>
        <h2 className="text-2xl font-semibold font-headline mb-4">Real-Time Sensors</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {mockSensorData.map((sensor) => (
            <SensorCard
              key={sensor.title}
              title={sensor.title}
              value={sensor.value}
              unit={sensor.unit}
              description={sensor.description}
              icon={sensor.icon}
              trendData={sensor.trendData}
              color={sensor.color}
            />
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
           <WeatherCard currentWeather={mockCurrentWeather} forecast={mockForecast} />
        </section>
        
        <section className="lg:col-span-1">
          <Card className="shadow-lg h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center gap-2">
                <Bell className="text-accent"/> Smart Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              {alerts.length > 0 ? (
                alerts.slice(0, 3).map((alert) => ( // Show top 3 alerts
                  <AlertItem
                    key={alert.id}
                    {...alert}
                    onDismiss={dismissAlert}
                  />
                ))
              ) : (
                <p className="text-muted-foreground">No active alerts.</p>
              )}
              {alerts.length > 3 && (
                <Button variant="link" asChild className="text-primary p-0 h-auto mt-2">
                  <Link href="/alerts">View all alerts ({alerts.length})</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </section>
      </div>

      <section>
        <h2 className="text-2xl font-semibold font-headline mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="font-headline text-lg flex items-center gap-2"><Lightbulb className="text-accent"/>Crop Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Get AI-powered suggestions for optimal crop selection.</p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/crop-recommendations">Get Recommendations</Link>
              </Button>
            </CardContent>
          </Card>
           <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="font-headline text-lg flex items-center gap-2"><AreaChart className="text-accent"/>View Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Analyze historical data and track farm performance.</p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/analytics">Go to Analytics</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
