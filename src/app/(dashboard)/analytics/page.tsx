"use client";

import { HistoricalDataChart } from "@/components/analytics/historical-data-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Users } from "lucide-react";

// More mock data for additional charts or stats
const summaryStats = [
  { title: "Total Yield (Last Season)", value: "12,500 kg", icon: TrendingUp, change: "+15%", changeType: "positive" as const },
  { title: "Average Profit per Hectare", value: "$2,300", icon: DollarSign, change: "+8%", changeType: "positive" as const },
  { title: "Active Fields", value: "12", icon: Users, change: "", changeType: "neutral" as const },
];

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">Farm Analytics</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Track performance, analyze trends, and make data-driven decisions for your farm.
        </p>
      </header>

      <section className="mb-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {summaryStats.map((stat) => (
            <Card key={stat.title} className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-headline">{stat.title}</CardTitle>
                <stat.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.change && (
                   <p className={`text-xs ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last period
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <section className="mb-8">
        <HistoricalDataChart />
      </section>

      {/* Placeholder for more charts */}
      <section>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Resource Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Chart for water usage, fertilizer consumption, etc. (Coming Soon)</p>
            <div className="min-h-[200px] flex items-center justify-center bg-muted/50 rounded-md mt-4">
              Placeholder for Resource Chart
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
