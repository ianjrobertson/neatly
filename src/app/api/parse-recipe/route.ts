export interface ParseRecipeRequest {
    url: string;
}

export async function POST(request: Request): Promise<Response> {
    const { url }: ParseRecipeRequest = await request.json();

    try {
        const response = await fetch(url);
        const html = await response.text();

        return Response.json({ html});
    } catch (error) {
        return Response.json({ error: 'Failed to fetch'}, {status: 500})
    }
}