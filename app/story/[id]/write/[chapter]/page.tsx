import { NotAuthenticated, NotFoundStory } from "@/app/(ui)/errors.module";
import { auth } from "@/auth";
import { getStory } from "@/utils/db";
import { Story } from "@/writersblock";
import WriteForm from "./write.form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ id: string, chapter: string }> }) {
  const id = (await params).id;
  const chapter = (await params).chapter;
  const session = await auth();
  if (!session || !session.user || !session.user.email) return <NotAuthenticated />
  const story: Story | null = await getStory(id, session.user.email);
  if (story === null) return <NotFoundStory invalidID={id} />
  if (Number.isNaN(Number.parseInt(chapter))) return <InvalidChapter chapter={chapter} id={id} />
  const storyPart = story.parts.find((storyPart) => storyPart.number === Number.parseInt(chapter));
  let partText: string = "";
  let partTitle: string = "";
  if (storyPart) {
    partText = storyPart.text;
    if (storyPart.title) partTitle = storyPart.title;
  }
  if (story.type === "short") partTitle = story.title;
  return (
    <main className="flex flex-col p-8 md:p-20 min-h-screen gap-4">
      <WriteForm storyID={id} storyType={story.type} chapter={chapter} currentText={partText} currentTitle={partTitle} />
    </main>
  )
}

function InvalidChapter({ chapter, id }: { id: string, chapter: string }) {
  return (
    <div className="flex flex-col min-h-screen md:p-20 p-8">
      <h1 className="font-semibold text-4xl">Chapter is invalid!</h1>
      <p>That chapter is either not a number, or invalid in another way!</p>
      <Link href={`/`} className="flex w-fit items-center gap-1 rounded-lg bg-slate-500 p-1 border-2 border-slate-700"><FontAwesomeIcon icon={faArrowLeft} /> Go Back</Link>
      <p className="text-sm text-slate-500">Story ID: {id}</p>
      <p className="text-sm text-slate-500">Chapter: {chapter}</p>
    </div>
  );
}