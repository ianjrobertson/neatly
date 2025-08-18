"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { ParseRecipeRequest, ParsedRecipe } from "@/types/recipe";
import { Link, ChefHat, Clock, Users, Star } from "lucide-react";

export default function Page() {
  const [link, setLink] = useState("");
  const [recipe, setRecipe] = useState<ParsedRecipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLink(e.target.value);
  };

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true);
    const parsedRecipe = await getRecipe({ url: link });
    setRecipe(parsedRecipe);
    setIsLoading(false);
  };

  const getRecipe = async (url: ParseRecipeRequest): Promise<ParsedRecipe | null> => {
    const response = await fetch("/api/parse-recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(url),
    });

    if (response.ok) {
      const data = await response.json();
      return data.recipe;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-medium text-foreground mb-4">
              Extract Recipe
              <span className="text-primary block">From Any Website</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Paste any recipe URL below and we&apos;ll extract all the ingredients and instructions for you.
            </p>
          </motion.div>

          {/* URL Input Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="url" className="text-sm font-medium text-foreground">
                      Recipe URL
                    </label>
                    <div className="relative">
                      <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        id="url"
                        name="url"
                        type="url"
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="https://example.com/recipe"
                        value={link}
                        onChange={handleTextChange}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleSubmit} 
                      disabled={!link.trim() || isLoading}
                      size="lg"
                      className="min-w-[120px]"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Extracting...
                        </div>
                      ) : (
                        <>
                          <ChefHat className="mr-2 h-4 w-4" />
                          Extract Recipe
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recipe Display */}
          {recipe && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Recipe Header Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{recipe.title}</CardTitle>
                  {recipe.description && (
                    <CardDescription className="text-base">
                      {recipe.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {recipe.servings && (
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{recipe.servings} servings</span>
                      </div>
                    )}
                    {recipe.totalTime && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{recipe.totalTime}</span>
                      </div>
                    )}
                    {recipe.rating && (
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span>{recipe.rating}/5</span>
                      </div>
                    )}
                    {recipe.author && (
                      <div className="flex items-center gap-2 text-sm">
                        <ChefHat className="h-4 w-4 text-muted-foreground" />
                        <span>{recipe.author}</span>
                      </div>
                    )}
                  </div>
                  
                  {recipe.tags && recipe.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {recipe.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Ingredients and Instructions Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Ingredients Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Ingredients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Instructions Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Instructions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-4">
                      {recipe.instructions.map((instruction, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </span>
                          <span className="text-sm leading-relaxed">{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="flex-1 max-w-xs">
                      Create Shopping List
                    </Button>
                    <Button size="lg" variant="outline" className="flex-1 max-w-xs">
                      Save Recipe
                    </Button>
                    <Button size="lg" variant="outline" className="flex-1 max-w-xs">
                      Share Recipe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
