"use client";
import { AlertItem } from "@/components/dashboard/alert-item";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState, useMemo, useEffect } from "react";

type Severity = "info" | "warning" | "error" | "success";

interface MockAlert {
  id: string;
  title: string;
  message: string;
  severity: Severity;
  timestamp: string;
  read: boolean;
}

const allMockAlerts: MockAlert[] = [
  { id: "1", title: "Low Soil Moisture", message: "Sector A soil moisture is at 35%. Irrigation recommended.", severity: "warning", timestamp: "2 hours ago", read: false },
  { id: "2", title: "Rain Expected", message: "Heavy rain forecasted for tomorrow afternoon. Consider harvesting sensitive crops.", severity: "info", timestamp: "1 day ago", read: false },
  { id: "3", title: "High Temperature", message: "Greenhouse temperature reached 35°C. Ventilation activated.", severity: "error", timestamp: "30 mins ago", read: false },
  { id: "4", title: "Successful Harvest", message: "Corn harvest in Sector B completed with good yield.", severity: "success", timestamp: "3 days ago", read: true },
  { id: "5", title: "Pest Alert", message: "Aphids detected in tomato plants in Greenhouse 2.", severity: "warning", timestamp: "4 hours ago", read: false },
  { id: "6", title: "Fertilizer Applied", message: "Nitrogen fertilizer applied to Sector C as scheduled.", severity: "info", timestamp: "2 days ago", read: true },
  { id: "7", title: "Equipment Maintenance", message: "Tractor maintenance due next week.", severity: "info", timestamp: "5 days ago", read: true },
  { id: "8", title: "Critical Frost Warning", message: "Temperature expected to drop below freezing tonight. Protect sensitive crops!", severity: "error", timestamp: "1 hour ago", read: false },
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<MockAlert[]>(allMockAlerts);
  const [filter, setFilter] = useState<Severity | "all">("all");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const dismissAlert = (id: string) => {
    setAlerts(prevAlerts => prevAlerts.map(alert => alert.id === id ? {...alert, read: true} : alert));
    // Or to remove: setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  };

  const markAllAsRead = () => {
    setAlerts(prevAlerts => prevAlerts.map(alert => ({...alert, read: true })));
  }

  const filteredAlerts = useMemo(() => {
    if (filter === "all") return alerts;
    return alerts.filter(alert => alert.severity === filter);
  }, [alerts, filter]);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-theme(space.24))]">
        <p>Loading Alerts...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold font-headline text-primary">Notifications</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Stay updated with important alerts and farm activities.
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Select value={filter} onValueChange={(value) => setFilter(value as Severity | "all")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="success">Success</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={markAllAsRead} variant="outline" disabled={alerts.every(a => a.read)}>Mark all as read</Button>
        </div>
      </header>

      {filteredAlerts.length > 0 ? (
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className={alert.read ? "opacity-60" : ""}>
              <AlertItem
                {...alert}
                onDismiss={dismissAlert}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No alerts match your filter.</p>
          {filter !== "all" && (
             <Button variant="link" onClick={() => setFilter("all")} className="text-primary">Show all alerts</Button>
          )}
        </div>
      )}
    </div>
  );
}
