"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ParseRecipeRequest, ParsedRecipe } from "@/types/recipe";
import Image from "next/image";

export default function Page() {
  const [link, setLink] = useState("");
  const [recipe, setRecipe] = useState<ParsedRecipe | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLink(e.target.value);
  };

  const handleSubmit = async (): Promise<void> => {
    const parsedRecipe = await getRecipe({ url: link });
    setRecipe(parsedRecipe);
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
    <div className="flex flex-col justify-center">
      <div className="flex flex-col pb-5">
        <label htmlFor="url">Enter a Recipe URL</label>
        <input
          id="url"
          name="url"
          type="text"
          className="bg-foreground rounded text-background"
          placeholder="https://..."
          onChange={handleTextChange}
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
      {recipe && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
          {recipe.description && <p className="text-gray-600 mb-4">{recipe.description}</p>}
          {recipe.author && <p><strong>Author:</strong> {recipe.author}</p>}
          {recipe.cuisine && <p><strong>Cuisine:</strong> {recipe.cuisine}</p>}
          {recipe.course && <p><strong>Course:</strong> {recipe.course}</p>}
          {recipe.rating && <p><strong>Rating:</strong> {recipe.rating}/5</p>}
          {recipe.servings && <p><strong>Servings:</strong> {recipe.servings}</p>}
          {recipe.prepTime && <p><strong>Prep Time:</strong> {recipe.prepTime}</p>}
          {recipe.cookTime && <p><strong>Cook Time:</strong> {recipe.cookTime}</p>}
          {recipe.totalTime && <p><strong>Total Time:</strong> {recipe.totalTime}</p>}
          {recipe.tags && recipe.tags.length > 0 && (
            <p><strong>Tags:</strong> {recipe.tags.join(', ')}</p>
          )}
          
          <h3 className="text-lg font-semibold mt-4 mb-2">Ingredients:</h3>
          <ul className="list-disc list-inside">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          
          <h3 className="text-lg font-semibold mt-4 mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="mb-2">{instruction}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
