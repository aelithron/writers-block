"use client"
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"

export default function EditForm({ id, currentTitle, currentType, currentDescription }: { id: string, currentTitle: string, currentType: "short" | "chaptered", currentDescription: string }) {
  const router = useRouter();
  const [title, setTitle] = useState<string>(currentTitle);
  const [type, setType] = useState<"short" | "chaptered">(currentType);
  const [description, setDescription] = useState<string>(currentDescription);
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title || title === "") {
      alert("Enter a title...");
      return;
    }
    fetch("/api/stories", { method: "PATCH", body: JSON.stringify({ id: id, title: title, type: type, description: description }) })
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
          alert("Error editing the story!");
          return;
        }
        if (res.error) {
          alert(`Error editing the story: ${res.message} (${res.error})`);
          return;
        }
        router.push(`/story/${id}`);
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
      <label htmlFor="description" className="text-left justify-start mt-2">Description</label>
      <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={6} className="bg-slate-500 border-2 border-slate-300 dark:border-slate-700 rounded-xl p-1" />
      <button type="submit" className="bg-slate-500 border-2 border-slate-300 dark:border-slate-700 rounded-xl px-2 py-1 text-lg w-fit h-fit mt-4 hover:text-sky-500"><FontAwesomeIcon icon={faSave} /> Save</button>
    </form>
  );
}