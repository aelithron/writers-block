"use client";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faCloud, faRotate, faSave, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function WriteForm({ currentText, currentTitle, storyID, storyType, chapter }: { currentText: string, currentTitle: string, storyID: string, storyType: "short" | "chaptered", chapter: string }) {
  const router = useRouter();
  const [text, setText] = useState<string>(currentText);
  const [title, setTitle] = useState<string>(currentTitle);
  const [saved, setSaved] = useState<"yes" | "no" | "error">("yes");

  function savePart() {
    fetch(`/api/stories/parts`, { method: "PUT", body: JSON.stringify({ id: storyID, chapter: chapter, text, title }) })
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
          setSaved("error");
          alert("Error updating the story part!");
          return;
        }
        if (res.error) {
          setSaved("error");
          alert(`Error updating the story part: ${res.message} (${res.error})`);
          return;
        };
        setSaved("yes");
      });
  }
  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
    setSaved("no");
  }
  function handleChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    setSaved("no");
  }
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!text || !title) {
      alert("Either your title or text is empty!");
      return;
    }
    savePart();
  }
  function returnToStory() {
    if (!text || (!title && storyType === "chaptered")) {
      const result = confirm("Either your text or title is empty, exit without saving?");
      if (result) {
        router.push(`/story/${storyID}`);
        return;
      } else return;
    }
    savePart();
    router.push(`/story/${storyID}`);
  }

  useEffect(() => window.addEventListener("beforeunload", (ev) => ev.preventDefault()), []);
  useEffect(() => {
    if (!text || !title) return;
    const timeout = setTimeout(() => {
      // it makes me duplicate this code for the autosave hook AAAAAAAAAAAAAAAAAAAAA
      fetch(`/api/stories/parts`, { method: "PUT", body: JSON.stringify({ id: storyID, chapter: chapter, text, title }) })
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
            setSaved("error");
            alert("Error updating the story part!");
            return;
          }
          if (res.error) {
            setSaved("error");
            alert(`Error updating the story part: ${res.message} (${res.error})`);
            return;
          };
          setSaved("yes");
        });
    }, 750);
    return () => clearTimeout(timeout);
  }, [text, title, chapter, storyID]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex gap-2 items-center">
        <button type="button" onClick={() => returnToStory()} className="flex bg-slate-300 dark:bg-slate-800 rounded-full p-2 w-min"><FontAwesomeIcon icon={faArrowLeft} size="lg" /></button>
        <button type="submit" className="flex bg-slate-300 dark:bg-slate-800 rounded-full p-2 w-min"><FontAwesomeIcon icon={faSave} size="lg" /></button>
        <SaveIndicator saved={saved} />
      </div>
      {storyType === "chaptered" ? <div className="flex flex-col gap-1 text-2xl font-semibold my-4 text-start">
        <h1>Chapter {chapter}:</h1>
        <input value={title} onChange={handleChangeTitle} className="underline outline-none" placeholder="Enter a title..." />
      </div> : <h1 className="text-2xl font-semibold my-4">{title}</h1>}
      {!text && <label htmlFor="writing">Start writing below!</label>}
      <textarea id="writing" onChange={handleChange} value={text} rows={20} className="bg-slate-500 border-2 border-slate-300 dark:border-slate-700 rounded-xl p-1 w-full" />
    </form>
  )
}

function SaveIndicator({ saved }: { saved: "yes" | "no" | "error" }) {
  let saveIcon: IconProp;
  switch (saved) {
    case "yes":
      saveIcon = faCloud;
      break;
    case "no":
      saveIcon = faRotate;
      break;
    case "error":
      saveIcon = faX;
      break;
    default:
      saveIcon = faX;
      break;
  }
  return (
    <div className="flex gap-2 bg-slate-300 dark:bg-slate-800 rounded-full p-2 w-min items-center">
      <p>Status:</p>
      <FontAwesomeIcon icon={saveIcon} />
    </div>
  );
}