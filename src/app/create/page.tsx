"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Page() {
  const [link, setLink] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLink(e.target.value);
  };

const handleSubmit = (): void => {
    alert(link || 'no link provided');
}

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
        <Button
            onClick={handleSubmit}
        >
            Submit
        </Button>
      </div>
    </div>
  );
}
