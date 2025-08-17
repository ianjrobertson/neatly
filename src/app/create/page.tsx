"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ParseRecipeRequest } from "../api/parse-recipe/route";

export default function Page() {
  const [link, setLink] = useState("");
  const [html, setHtml] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLink(e.target.value);
  };

  const handleSubmit = async (): Promise<void> => {
    const html = await getHtml({ url: link });
    setHtml(html ?? "");
  };

  const getHtml = async (url: ParseRecipeRequest) => {
    const response = await fetch("/api/parse-recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(url),
    });

    if (response.ok) {
      const data = await response.json();
      return data.html;
    }
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
      <div>{html && <div>{html}</div>}</div>
    </div>
  );
}
