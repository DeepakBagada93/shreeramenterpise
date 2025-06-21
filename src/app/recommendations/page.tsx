'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductCard from '@/components/product/ProductCard';
import { getStyleRecommendations, StyleRecommendationsInput } from '@/ai/flows/style-recommendations';
import { USER_PROFILES, getProductById, UserProfile, Product } from '@/lib/mock-data';
import { Award, Loader2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function RecommendationsPage() {
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGetRecommendations = async () => {
    if (!selectedUserId) {
      toast({
        title: "Select User",
        description: "Please select a user profile to get recommendations.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const userProfile = USER_PROFILES.find(u => u.id === selectedUserId);
      if (!userProfile) {
        throw new Error('User profile not found.');
      }

      const input: StyleRecommendationsInput = {
        purchaseHistory: JSON.stringify(userProfile.purchaseHistory),
      };

      const result = await getStyleRecommendations(input);
      
      if (result.recommendedItems) {
        const recommendedItemIds = JSON.parse(result.recommendedItems) as string[];
        const recommendedProducts = recommendedItemIds
          .map(id => getProductById(id))
          .filter(p => p !== undefined) as Product[];
        setRecommendations(recommendedProducts);
        if (recommendedProducts.length === 0 && recommendedItemIds.length > 0) {
          toast({
            title: "Some Recommendations Not Found",
            description: "Some recommended product IDs could not be found in the mock data.",
          });
        } else if (recommendedProducts.length === 0) {
           toast({
            title: "No Recommendations",
            description: "No specific recommendations found for this profile.",
          });
        }
      } else {
        setRecommendations([]);
         toast({
            title: "No Recommendations",
            description: "The AI did not return any recommendations.",
          });
      }
    } catch (e) {
      console.error('Error getting recommendations:', e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
      toast({
        title: "Error",
        description: `Failed to get recommendations: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedUserProfile = USER_PROFILES.find(u => u.id === selectedUserId);

  return (
    <div className="container mx-auto px-4">
      <div className="space-y-10">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <Award className="mx-auto h-12 w-12 text-primary mb-2" />
            <CardTitle className="text-3xl font-bold font-headline">Personalized Style Hub</CardTitle>
            <CardDescription className="text-lg text-muted-foreground max-w-xl mx-auto">
              Select a user profile to discover AI-powered style recommendations based on their purchase history.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="w-full max-w-sm">
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger aria-label="Select User Profile">
                  <SelectValue placeholder="Select a user profile" />
                </SelectTrigger>
                <SelectContent>
                  {USER_PROFILES.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleGetRecommendations} disabled={isLoading || !selectedUserId} size="lg">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Getting Recommendations...
                </>
              ) : (
                <>
                  <Award className="mr-2 h-5 w-5" />
                  Get Style Recommendations
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {selectedUserProfile && !isLoading && (
          <Card>
            <CardHeader>
              <CardTitle>Purchase History for {selectedUserProfile.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedUserProfile.purchaseHistory.length > 0 ? (
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {selectedUserProfile.purchaseHistory.map(itemId => {
                    const item = getProductById(itemId);
                    return <li key={itemId}>{item ? item.name : `Unknown Item (ID: ${itemId})`}</li>;
                  })}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No purchase history available for this user.</p>
              )}
            </CardContent>
          </Card>
        )}


        {error && (
          <div className="text-center p-6 bg-destructive/10 text-destructive border border-destructive rounded-md flex items-center justify-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        )}

        {recommendations.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-center mb-8 font-headline">
              Recommended For You
              {selectedUserProfile ? `, ${selectedUserProfile.name}`: ''}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {recommendations.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
        
        {!isLoading && !error && recommendations.length === 0 && selectedUserId && (
           <div className="text-center py-10">
              <p className="text-xl text-muted-foreground">No recommendations to display at the moment.</p>
              <p className="text-sm text-muted-foreground mt-1">Try selecting a different profile or check back later.</p>
           </div>
        )}
      </div>
    </div>
  );
}
