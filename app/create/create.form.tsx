"use client"

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useState } from "react"

export default function CreateForm() {
  const [title, setTitle] = useState<string>("");
  function handleSubmit(e: FormEvent) {

  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-fit h-fit justify-center items-center text-center">
      <label htmlFor="title" className="text-left justify-start">Title</label>
      <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-slate-500 border-2 border-slate-300 dark:border-slate-700 rounded-xl p-1" />
      <button type="submit" className="bg-slate-500 border-2 border-slate-300 dark:border-slate-700 rounded-xl px-2 py-1 text-lg w-fit h-fit mt-2"><FontAwesomeIcon icon={faPlus} /> Create</button>
    </form>
  );
}