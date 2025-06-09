import type { RecommendCropsOutput } from "@/ai/flows/crop-recommendation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Lightbulb } from "lucide-react";

interface RecommendationResultProps {
  result: RecommendCropsOutput;
}

export function RecommendationResult({ result }: RecommendationResultProps) {
  const crops = result.recommendedCrops.split(',').map(crop => crop.trim()).filter(crop => crop.length > 0);

  return (
    <Card className="mt-8 shadow-xl bg-gradient-to-br from-primary/5 via-background to-background">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <Lightbulb className="w-8 h-8 text-accent" />
          <CardTitle className="font-headline text-2xl text-primary">AI Crop Recommendations</CardTitle>
        </div>
        <CardDescription>Based on your farm's conditions, here are some suitable crops:</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 font-headline">Recommended Crops:</h3>
          {crops.length > 0 ? (
            <ul className="space-y-2">
              {crops.map((crop, index) => (
                <li key={index} className="flex items-center gap-2 text-md">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>{crop}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No specific crops identified in the recommendation list.</p>
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2 font-headline">Reasoning:</h3>
          <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
            {result.reasoning}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
