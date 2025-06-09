"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { month: "January", cropA: 4000, cropB: 2400 },
  { month: "February", cropA: 3000, cropB: 1398 },
  { month: "March", cropA: 2000, cropB: 9800 },
  { month: "April", cropA: 2780, cropB: 3908 },
  { month: "May", cropA: 1890, cropB: 4800 },
  { month: "June", cropA: 2390, cropB: 3800 },
  { month: "July", cropA: 3490, cropB: 4300 },
];

const chartConfig = {
  cropA: {
    label: "Crop A Yield (kg)",
    color: "hsl(var(--chart-1))",
  },
  cropB: {
    label: "Crop B Yield (kg)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function HistoricalDataChart() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Crop Yield Over Time</CardTitle>
        <CardDescription>Monthly yield comparison for selected crops (mock data).</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar dataKey="cropA" fill="var(--color-cropA)" radius={4} />
            <Bar dataKey="cropB" fill="var(--color-cropB)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
