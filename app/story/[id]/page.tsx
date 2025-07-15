import { NotFoundStory } from "@/app/(ui)/notfound.module";
import { fakeGetStories } from "@/utils/tempFakeData"
import { Story, StoryPart } from "@/writersblock"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const story: Story | undefined = fakeGetStories().find(e => e._id.toString() === id);
  if (story === undefined) return <NotFoundStory invalidID={id} />
  return (
    <main className="grid grid-cols-1 md:grid-cols-4 p-8 md:p-20 min-h-screen gap-4">
      <div className="flex flex-col gap-2">
        <Link href={`/`} className="flex bg-slate-300 dark:bg-slate-800 rounded-full p-2 w-min"><FontAwesomeIcon icon={faArrowLeft} size="lg" /></Link>
        <h1 className="font-semibold text-3xl">{story.title}</h1>
        <img></img>
        {story.type === "short" ? 
          <p className="bg-green-300 rounded-xl p-2 flex text-black font-bold w-min text-nowrap">Short Story</p> : 
          <p className="bg-blue-300 rounded-xl p-2 flex text-black font-bold w-min text-nowrap">Chaptered Story</p>
        }
        <p className="bg-slate-300 dark:bg-slate-800 rounded-2xl p-2 text-pretty">{story.description}</p>
      </div>
      <div className="flex flex-col md:col-span-3 bg-slate-300 dark:bg-slate-800 gap-4 p-4 rounded-xl">
        <h1 className="text-xl font-semibold text-center mt-4">{story.type === "short" ? "Story:" : "Chapters"}</h1>
        <PartDisplay story={story} />
      </div>
    </main>
  );
}

function PartDisplay({ story }: { story: Story }) {
  if (story.type === "short") return (
    <div>

    </div>
  );
  if (story.type === "chaptered") return (
    <div>
      
    </div>
  );
}