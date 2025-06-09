"use client";

import { ProfileForm } from "@/components/profile/profile-form";
import { FarmManagement } from "@/components/profile/farm-management";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">Your AgriView Profile</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Manage your personal details and farm information.
        </p>
      </header>

      <div className="space-y-8">
        <ProfileForm />
        <Separator />
        <FarmManagement />
      </div>
    </div>
  );
}
