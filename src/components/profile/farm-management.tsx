"use client";

import { useState }_ from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Edit, Trash2, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Farm {
  id: string;
  name: string;
  location: string;
  cropPreferences: string;
  pastYields: string;
}

const initialFarms: Farm[] = [
  { id: "farm1", name: "Green Acres Farm", location: "Valley Region", cropPreferences: "Corn, Soybeans", pastYields: "Corn: 5 tons/acre (2023), Soybeans: 2 tons/acre (2023)" },
  { id: "farm2", name: "Sunny Meadows", location: "Hillside Area", cropPreferences: "Wheat, Barley, Tomatoes", pastYields: "Wheat: 3 tons/acre (2023)" },
];

export function FarmManagement() {
  const [farms, setFarms] = useState<Farm[]>(initialFarms);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentFarm, setCurrentFarm] = useState<Partial<Farm> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleAddNewFarm = () => {
    setCurrentFarm({});
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditFarm = (farm: Farm) => {
    setCurrentFarm(farm);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeleteFarm = (id: string) => {
    setFarms(farms.filter(farm => farm.id !== id));
    toast({ title: "Farm Deleted", description: "The farm has been removed from your profile." });
  };

  const handleSaveFarm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const farmData = Object.fromEntries(formData.entries()) as Omit<Farm, 'id'>;

    if (isEditing && currentFarm?.id) {
      setFarms(farms.map(f => f.id === currentFarm.id ? { ...f, ...farmData } : f));
      toast({ title: "Farm Updated", description: "Farm details have been saved." });
    } else {
      const newFarm = { ...farmData, id: `farm${Date.now()}` };
      setFarms([...farms, newFarm]);
      toast({ title: "Farm Added", description: "New farm has been added to your profile." });
    }
    setIsDialogOpen(false);
    setCurrentFarm(null);
  };

  return (
    <Card className="shadow-lg mt-8">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle className="font-headline">Farm Management</CardTitle>
          <CardDescription>Manage your farm locations and details.</CardDescription>
        </div>
        <Button onClick={handleAddNewFarm} className="bg-accent text-accent-foreground hover:bg-accent/90">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Farm
        </Button>
      </CardHeader>
      <CardContent>
        {farms.length === 0 ? (
          <p className="text-muted-foreground">No farms added yet. Click "Add New Farm" to get started.</p>
        ) : (
          <div className="space-y-4">
            {farms.map(farm => (
              <Card key={farm.id} className="bg-background/50">
                <CardHeader className="flex flex-row justify-between items-start pb-3">
                  <div>
                    <CardTitle className="text-lg font-semibold font-headline">{farm.name}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="w-4 h-4 mr-1"/>
                      {farm.location}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEditFarm(farm)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteFarm(farm.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="text-sm space-y-2 pt-0">
                  <p><strong>Crop Preferences:</strong> {farm.cropPreferences}</p>
                  <p><strong>Past Yields:</strong> {farm.pastYields}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <form onSubmit={handleSaveFarm}>
            <DialogHeader>
              <DialogTitle className="font-headline">{isEditing ? "Edit Farm" : "Add New Farm"}</DialogTitle>
              <DialogDescription>
                {isEditing ? "Update the details for this farm." : "Enter the details for your new farm."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" name="name" defaultValue={currentFarm?.name || ""} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">Location</Label>
                <Input id="location" name="location" defaultValue={currentFarm?.location || ""} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cropPreferences" className="text-right">Crop Prefs</Label>
                <Textarea id="cropPreferences" name="cropPreferences" defaultValue={currentFarm?.cropPreferences || ""} className="col-span-3 resize-none" placeholder="e.g., Corn, Soybeans, Wheat"/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pastYields" className="text-right">Past Yields</Label>
                <Textarea id="pastYields" name="pastYields" defaultValue={currentFarm?.pastYields || ""} className="col-span-3 resize-none" placeholder="e.g., Corn: 5 tons/acre (2023)"/>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">{isEditing ? "Save Changes" : "Add Farm"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
