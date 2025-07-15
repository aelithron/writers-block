import { fakeGetStories } from "@/utils/tempFakeData";
import { truncate } from "@/utils/universal";
import { Story } from "@/writersblock";
import Link from "next/link";

export const dynamic = "force-dynamic";
export default function Home() {
  const stories: Story[] = fakeGetStories();
  return (
    <main className="flex flex-col min-h-screen p-8 md:p-20">
      <h1 className="text-4xl font-semibold">Your Stories</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-4">
        {stories.map((story) =>
          <div key={story._id.toString()} className="grid grid-rows-1 grid-cols-5 bg-slate-500 border-2 border-slate-300 dark:border-slate-700 rounded-lg p-2 h-28">
            <img></img>
            <div className="col-span-4 flex flex-col">
              <Link href={`/story/${story._id}`} className="text-lg font-semibold underline hover:text-sky-500">{story.title}</Link>
              <p className="text-pretty">{truncate(story.description)}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
