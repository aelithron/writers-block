"use client"

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"

export default function CreateForm() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<"short" | "chaptered">("short");
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title || title === "") {
      alert("Enter a title...");
      return;
    }
    fetch("/api/stories", { method: "POST", body: JSON.stringify({ title: title, type: type }) })
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
        if (!res) {
          alert("Error creating the story!");
          return;
        }
        if (res.error) {
          alert(`Error creating the story: ${res.message} (${res.error})`);
          return;
        }
        router.push(`/story/${res.storyID}`);
      });
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-fit h-fit justify-center items-center text-center">
      <label htmlFor="title" className="text-left justify-start">Title</label>
      <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-slate-500 border-2 border-slate-300 dark:border-slate-700 rounded-xl p-1" />
      <label className="text-left justify-start mt-2">Type</label>
      <div className="flex gap-2">
        <button type="button" onClick={() => setType("short")} className={`bg-green-300 rounded-xl p-2 flex text-black font-bold w-min text-nowrap border-2 ${type === "short" ? "border-violet-300" : "border-slate-800"}`}>Short Story</button>
        <button type="button" onClick={() => setType("chaptered")} className={`bg-blue-300 rounded-xl p-2 flex text-black font-bold w-min text-nowrap border-2 ${type === "chaptered" ? "border-violet-300" : "border-slate-800"}`}>Chaptered Story</button>
      </div>
      <button type="submit" className="bg-slate-500 border-2 border-slate-300 dark:border-slate-700 rounded-xl px-2 py-1 text-lg w-fit h-fit mt-2 hover:text-sky-500"><FontAwesomeIcon icon={faPlus} /> Create</button>
    </form>
  );
}