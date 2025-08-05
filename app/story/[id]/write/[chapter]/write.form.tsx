"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function WriteForm({ currentText, storyID, chapter }: { currentText: string, storyID: string, chapter: string }) {
  const router = useRouter();
  const [text, setText] = useState<string>(currentText);
  function handleSubmit(e: FormEvent) {
    fetch(`/api/stories/chapters`, { method: "PUT", body: JSON.stringify({ id: storyID, chapter: chapter, text }) })
      .then((res) => {
        if (!res) return null;
        try {
          const json = res.json();
          return json;
        } catch {
          return null;
        }
      })
      .then((res) => {
        if (!res) return;
        if (res.error) {
          alert(`Error updating the chapter: ${res.message} (${res.error})`);
          return;
        };
        router.push(`/story/${storyID}`);
      })
  }
  return (
    <form onSubmit={handleSubmit}>

    </form>
  )
}