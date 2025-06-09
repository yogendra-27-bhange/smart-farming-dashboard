"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RecommendCropsInput, RecommendCropsOutput } from "@/ai/flows/crop-recommendation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const formSchema = z.object({
  soilType: z.string().min(2, "Soil type is required."),
  soilMoisture: z.enum(["low", "medium", "high"], { required_error: "Soil moisture is required."}),
  temperature: z.coerce.number().min(-50, "Temperature seems too low.").max(100, "Temperature seems too high."),
  weatherForecast: z.string().min(10, "Weather forecast needs to be at least 10 characters."),
  historicalData: z.string().min(10, "Historical data needs to be at least 10 characters."),
});

type RecommendationFormValues = z.infer<typeof formSchema>;

interface RecommendationFormProps {
  onSubmit: (data: RecommendCropsInput) => Promise<void>;
  isLoading: boolean;
}

const soilTypes = ["Sandy", "Clay", "Loam", "Silty", "Peaty", "Chalky"];

export function RecommendationForm({ onSubmit, isLoading }: RecommendationFormProps) {
  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      soilType: "",
      soilMoisture: undefined,
      temperature: 25,
      weatherForecast: "Sunny with occasional clouds for the next 5 days.",
      historicalData: "Previous season had good yield with tomatoes. Corn struggled due to dry spell.",
    },
  });

  const handleFormSubmit = (values: RecommendationFormValues) => {
    onSubmit(values as RecommendCropsInput);
  };

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Find the Best Crops for Your Farm</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="soilType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Soil Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select soil type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {soilTypes.map(type => <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The primary type of soil on your farm.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="soilMoisture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Soil Moisture</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select soil moisture level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Current moisture level of the soil.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="temperature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Temperature (°C)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 25" {...field} />
                  </FormControl>
                  <FormDescription>Average daily temperature.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weatherForecast"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>5-Day Weather Forecast</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Sunny for 2 days, followed by light rain..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>A brief summary of the upcoming weather.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="historicalData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Historical Crop Performance</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Last year, corn yield was high. Wheat suffered from pests."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Summary of past crop yields and performance.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto bg-primary hover:bg-primary/90 text-lg py-3">
              {isLoading ? "Getting Recommendations..." : "Get Crop Recommendations"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
