// This is an autogenerated file from Firebase Studio.

'use server';

/**
 * @fileOverview Implements the style recommendation flow.
 *
 * - getStyleRecommendations - A function that takes a user's purchase history and returns personalized style recommendations.
 * - StyleRecommendationsInput - The input type for the getStyleRecommendations function.
 * - StyleRecommendationsOutput - The return type for the getStyleRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StyleRecommendationsInputSchema = z.object({
  purchaseHistory: z
    .string()
    .describe('The user purchase history as a JSON string array of product ids.'),
});

export type StyleRecommendationsInput = z.infer<
  typeof StyleRecommendationsInputSchema
>;

const StyleRecommendationsOutputSchema = z.object({
  recommendedItems: z
    .string()
    .describe(
      'A list of recommended item IDs as a JSON string array based on the purchase history.'
    ),
});

export type StyleRecommendationsOutput = z.infer<
  typeof StyleRecommendationsOutputSchema
>;

export async function getStyleRecommendations(
  input: StyleRecommendationsInput
): Promise<StyleRecommendationsOutput> {
  return styleRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'styleRecommendationsPrompt',
  input: {schema: StyleRecommendationsInputSchema},
  output: {schema: StyleRecommendationsOutputSchema},
  prompt: `Based on the user's purchase history, recommend some items that the user might like.

Purchase History: {{{purchaseHistory}}}

Return a JSON string array of recommended product IDs.`,
});

const styleRecommendationsFlow = ai.defineFlow(
  {
    name: 'styleRecommendationsFlow',
    inputSchema: StyleRecommendationsInputSchema,
    outputSchema: StyleRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
