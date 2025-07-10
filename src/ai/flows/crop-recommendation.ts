'use server';

/**
 * @fileOverview Provides AI-driven crop recommendations based on farm conditions.
 *
 * - recommendCrops - A function that provides crop recommendations.
 * - RecommendCropsInput - The input type for the recommendCrops function.
 * - RecommendCropsOutput - The return type for the recommendCrops function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendCropsInputSchema = z.object({
  soilType: z
    .string()
    .describe('The type of soil on the farm (e.g., sandy, clay, loam).'),
  soilMoisture: z
    .string()
    .describe('The current moisture level of the soil (e.g., low, medium, high).'),
  temperature: z
    .number()
    .describe('The current temperature in Celsius.'),
  weatherForecast: z
    .string()
    .describe('A brief weather forecast for the next 5 days (e.g., sunny, rainy).'),
  historicalData: z
    .string()
    .describe('Summary of past crop yields and performance on the farm.'),
});
export type RecommendCropsInput = z.infer<typeof RecommendCropsInputSchema>;

const RecommendCropsOutputSchema = z.object({
  recommendedCrops: z
    .string()
    .describe('A list of recommended crops based on the input parameters.'),
  reasoning: z
    .string()
    .describe('The AI’s reasoning for the crop recommendations.'),
});
export type RecommendCropsOutput = z.infer<typeof RecommendCropsOutputSchema>;

export async function recommendCrops(input: RecommendCropsInput): Promise<RecommendCropsOutput> {
  return recommendCropsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendCropsPrompt',
  input: {schema: RecommendCropsInputSchema},
  output: {schema: RecommendCropsOutputSchema},
  prompt: `You are an expert agricultural advisor. Based on the following information about a farm, recommend the best crops to plant.

Soil Type: {{{soilType}}}
Soil Moisture: {{{soilMoisture}}}
Temperature: {{{temperature}}}°C
Weather Forecast: {{{weatherForecast}}}
Historical Data: {{{historicalData}}}

Consider all these factors to provide a list of recommended crops and your reasoning for each recommendation.
`,
});

const recommendCropsFlow = ai.defineFlow(
  {
    name: 'recommendCropsFlow',
    inputSchema: RecommendCropsInputSchema,
    outputSchema: RecommendCropsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
