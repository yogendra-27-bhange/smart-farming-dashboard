"use client";

import { useState } from "react";
import { RecommendationForm } from "@/components/crop-recommendations/recommendation-form";
import { RecommendationResult } from "@/components/crop-recommendations/recommendation-result";
import { recommendCrops } from "@/ai/flows/crop-recommendation";
import type { RecommendCropsInput, RecommendCropsOutput } from "@/ai/flows/crop-recommendation";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function CropRecommendationsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RecommendCropsOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (data: RecommendCropsInput) => {
    setIsLoading(true);
    setResult(null); 
    try {
      const recommendation = await recommendCrops(data);
      setResult(recommendation);
      toast({
        title: "Recommendations Ready!",
        description: "AI has generated crop suggestions for your farm.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error getting crop recommendations:", error);
      toast({
        title: "Error",
        description: "Could not fetch crop recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <header className="mb-8 text-center md:text-left">
        <h1 className="text-4xl font-bold font-headline text-primary">Crop Recommendation AI</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Leverage AI to discover the best crops for your farm based on specific conditions.
        </p>
      </header>

      <RecommendationForm onSubmit={handleSubmit} isLoading={isLoading} />

      {isLoading && (
        <div className="mt-8 space-y-4">
          <Skeleton className="h-12 w-1/2 mx-auto md:mx-0" />
          <Skeleton className="h-8 w-3/4 mx-auto md:mx-0" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      )}
      {result && !isLoading && <RecommendationResult result={result} />}
    </div>
  );
}
