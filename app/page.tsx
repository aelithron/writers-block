import { auth } from "@/auth";
import { getAllStories } from "@/utils/db";
import { truncate } from "@/utils/universal";
import { Story } from "@/writersblock";
import Link from "next/link";
import { NotAuthenticated } from "./(ui)/errors.module";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const dynamic = "force-dynamic";
export default async function Home() {
  const session = await auth();
  if (!session || !session.user || !session.user.email) return <NotAuthenticated />
  const stories: Story[] = await getAllStories(session.user.email);
  return (
    <main className="flex flex-col min-h-screen p-8 md:p-20">
      <div className="flex justify-between gap-2">
        <h1 className="text-4xl font-semibold">Your Stories</h1>
        <Link href={"/create"} className="bg-slate-500 border-2 border-slate-300 dark:border-slate-700 rounded-xl px-2 py-1 text-lg w-fit h-fit"><FontAwesomeIcon icon={faPlus} /> Create a Story</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-4">
        {stories.map((story) =>
          <div key={story._id.toString()} className="flex flex-col bg-slate-500 border-2 border-slate-300 dark:border-slate-700 rounded-lg p-2 h-28">
            <Link href={`/story/${story._id}`} className="text-lg font-semibold underline hover:text-sky-500">{story.title}</Link>
            <p className="text-pretty">{truncate((story.description ? story.description : "Story has no description!"), 92)}</p>
          </div>
        )}
        {stories.length < 1 && <div className="md:col-span-3 text-xl text-center items-center mt-6">
          <h2 className="mb-3">You don&rsquo;t have any stories! Click the button to create one.</h2>
          <Link href={"/create"} className="bg-slate-500 border-2 border-slate-300 dark:border-slate-700 rounded-xl px-2 py-1 text-lg w-fit h-fit"><FontAwesomeIcon icon={faPlus} /> Create a Story</Link>
        </div>}
      </div>
    </main>
  );
}
