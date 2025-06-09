"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";
import type { Icon } from "lucide-react";

interface SensorDataPoint {
  time: string; // Or number for timestamp
  value: number;
}

interface SensorCardProps {
  title: string;
  value: string | number;
  unit: string;
  description?: string;
  icon: Icon;
  trendData?: SensorDataPoint[];
  color?: string; // hsl string for chart color
}

const chartConfig = {
  value: {
    label: "Value",
  },
} satisfies ChartConfig;


export function SensorCard({ title, value, unit, description, icon: IconComponent, trendData, color }: SensorCardProps) {
  const chartColor = color || "var(--color-primary)";
  
  const customChartConfig = {
    value: {
      label: title,
      color: chartColor,
    },
  } satisfies ChartConfig;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium font-headline">{title}</CardTitle>
        <IconComponent className="h-6 w-6 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-primary">
          {value}
          <span className="text-xl text-muted-foreground ml-1">{unit}</span>
        </div>
        {description && <CardDescription className="text-xs text-muted-foreground mt-1">{description}</CardDescription>}
        {trendData && trendData.length > 1 && (
          <div className="h-[80px] mt-4">
            <ChartContainer config={customChartConfig} className="w-full h-full">
              <LineChart
                accessibilityLayer
                data={trendData}
                margin={{
                  left: -20, // Adjusted to hide Y-axis labels but keep line
                  right: 5,
                  top: 5,
                  bottom: 0,
                }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/50" />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0,5)} // Show only first 3 chars of time/label
                  className="text-xs"
                />
                <YAxis hide={true} domain={['dataMin - 5', 'dataMax + 5']} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" hideLabel />}
                />
                <Line
                  dataKey="value"
                  type="monotone"
                  strokeWidth={2}
                  dot={false}
                  stroke={`hsl(${chartColor})`}
                />
              </LineChart>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
