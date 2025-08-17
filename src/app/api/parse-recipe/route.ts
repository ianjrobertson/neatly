import * as cheerio from 'cheerio';
import { ParseRecipeRequest, ParsedRecipe, ParseRecipeResponse } from '@/types/recipe';

export async function POST(request: Request): Promise<Response> {
    const { url }: ParseRecipeRequest = await request.json();

    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        // Try to parse JSON-LD structured data first
        const jsonLdData = parseJsonLd($);
        if (jsonLdData) {
            return Response.json({ recipe: jsonLdData } as ParseRecipeResponse);
        }

        // Fallback to HTML parsing
        const recipe = parseHtmlRecipe($);
        return Response.json({ recipe } as ParseRecipeResponse);
    } catch (error) {
        return Response.json({ error: 'Failed to fetch or parse recipe' } as ParseRecipeResponse, { status: 500 });
    }
}

function parseJsonLd($: cheerio.Root): ParsedRecipe | null {
    const jsonLdScript = $('script[type="application/ld+json"]').first();
    if (!jsonLdScript.length) return null;

    try {
        const jsonData = JSON.parse(jsonLdScript.html() || '');
        const recipe = Array.isArray(jsonData) ? jsonData.find(item => item['@type'] === 'Recipe') : 
                      jsonData['@type'] === 'Recipe' ? jsonData : null;

        if (!recipe) return null;

        return {
            title: recipe.name,
            description: recipe.description,
            image: recipe.image?.url || recipe.image,
            ingredients: recipe.recipeIngredient || [],
            instructions: recipe.recipeInstructions?.map((instruction: any) => 
                typeof instruction === 'string' ? instruction : instruction.text || instruction.name
            ) || [],
            servings: recipe.recipeYield?.toString(),
            cookTime: recipe.cookTime,
            prepTime: recipe.prepTime,
            totalTime: recipe.totalTime,
            rating: recipe.aggregateRating?.ratingValue,
            author: recipe.author?.name || recipe.author,
            cuisine: recipe.recipeCuisine,
            course: recipe.recipeCategory,
            tags: recipe.keywords ? (Array.isArray(recipe.keywords) ? recipe.keywords : [recipe.keywords]) : undefined
        };
    } catch {
        return null;
    }
}

function parseHtmlRecipe($: cheerio.Root): ParsedRecipe {
    // Common selectors for recipe sites
    const title = $('h1, .recipe-title, [class*="title"], .entry-title').first().text().trim();
    
    const ingredients: string[] = [];
    $('[class*="ingredient"], .recipe-ingredient, .ingredients li, [itemprop="recipeIngredient"]').each((_, el) => {
        const text = $(el).text().trim();
        if (text) ingredients.push(text);
    });

    const instructions: string[] = [];
    $('[class*="instruction"], .recipe-instruction, .instructions li, [itemprop="recipeInstructions"]').each((_, el) => {
        const text = $(el).text().trim();
        if (text) instructions.push(text);
    });

    return {
        title: title || 'Recipe',
        ingredients,
        instructions,
        servings: $('[class*="serving"], [itemprop="recipeYield"]').first().text().trim() || undefined,
        cookTime: $('[class*="cook-time"], [itemprop="cookTime"]').first().text().trim() || undefined,
        prepTime: $('[class*="prep-time"], [itemprop="prepTime"]').first().text().trim() || undefined
    };
}