"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">Application Settings</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Configure your AgriView experience.
        </p>
      </header>

      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Notification Preferences</CardTitle>
            <CardDescription>Manage how you receive alerts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="flex flex-col gap-1">
                <span>Email Notifications</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Receive important alerts via email.
                </span>
              </Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications" className="flex flex-col gap-1">
                <span>SMS Notifications</span>
                 <span className="font-normal leading-snug text-muted-foreground">
                  Get critical alerts via SMS (if configured).
                </span>
              </Label>
              <Switch id="sms-notifications" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Account Settings</CardTitle>
            <CardDescription>Manage your account security.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="current-password">Change Password</Label>
              <Input id="current-password" type="password" placeholder="Current Password" className="mt-1"/>
              <Input id="new-password" type="password" placeholder="New Password" className="mt-2"/>
              <Input id="confirm-password" type="password" placeholder="Confirm New Password" className="mt-2"/>
              <Button className="mt-3 bg-primary hover:bg-primary/90">Update Password</Button>
            </div>
          </CardContent>
        </Card>

         <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Theme (Coming Soon)</CardTitle>
            <CardDescription>Customize the look and feel of AgriView.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Dark mode and theme options will be available here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
