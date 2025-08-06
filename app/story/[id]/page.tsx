import { NotAuthenticated, NotFoundStory } from "@/app/(ui)/errors.module";
import { auth } from "@/auth";
import { getStory } from "@/utils/db";
import { truncate } from "@/utils/universal";
import { Story } from "@/writersblock"
import { faArrowLeft, faFileArrowDown, faGear, faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ObjectId } from "mongodb";
import Link from "next/link";

export const dynamic = "force-dynamic";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const session = await auth();
  if (!session || !session.user || !session.user.email) return <NotAuthenticated />
  const story: Story | null = await getStory(id, session.user.email);
  if (story === null) return <NotFoundStory invalidID={id} />
  return (
    <main className="grid grid-cols-1 md:grid-cols-4 p-8 md:p-20 min-h-screen gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <Link href={`/`} className="flex bg-slate-300 dark:bg-slate-800 rounded-full p-2 w-min hover:text-sky-500"><FontAwesomeIcon icon={faArrowLeft} size="lg" /></Link>
          <Link href={`/story/${id}/edit`} className="flex bg-slate-300 dark:bg-slate-800 rounded-full p-2 w-min hover:text-sky-500"><FontAwesomeIcon icon={faGear} size="lg" /></Link>
          <Link href={`/api/stories/export?id=${id}`} target="_blank" className="flex bg-slate-300 dark:bg-slate-800 rounded-full p-2 w-min hover:text-sky-500"><FontAwesomeIcon icon={faFileArrowDown} size="lg" /></Link>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-3xl">{story.title}</h1>
        </div>
        {/* put the cover here if i add it */}
        {story.type === "short" ?
          <p className="bg-green-300 rounded-xl p-2 flex text-black font-bold w-min text-nowrap">Short Story</p> :
          <p className="bg-blue-300 rounded-xl p-2 flex text-black font-bold w-min text-nowrap">Chaptered Story</p>
        }
        <p className="bg-slate-300 dark:bg-slate-800 rounded-2xl p-2 text-pretty">{story.description ? story.description : "Story has no description!"}</p>
      </div>
      <div className="flex flex-col md:col-span-3 bg-slate-300 dark:bg-slate-800 gap-4 p-4 rounded-xl">
        <div className="flex items-center align-middle gap-2 justify-center mt-4">
          <h1 className="text-xl font-semibold">{story.type === "short" ? "Story" : "Chapters"}</h1>
          {story.type === "chaptered" && <Link href={`/story/${id}/write/${story.parts.length + 1}`} className="flex bg-slate-400 dark:bg-slate-700 rounded-full p-1 w-min hover:text-sky-500">
            <FontAwesomeIcon icon={faPlus} />
          </Link>}
        </div>
        <PartDisplay story={story} />
      </div>
    </main>
  );
}

function PartDisplay({ story }: { story: Story }) {
  const parts = story.parts;
  if (story.type === "short") {
    if (!parts[0]) return <NoWritingWarning id={story._id} />
    return (
      <div className="flex flex-col">
        <Link href={`/story/${story._id.toString()}/write/1`} className="px-2 py-1 bg-purple-300 dark:bg-purple-700 rounded-full w-min text-nowrap items-center mb-2"><FontAwesomeIcon icon={faPencil} /></Link>
        <p className="text-pretty">{parts[0].text}</p>
      </div>
    )
  } else if (story.type === "chaptered") {
    if (parts.length === 0) return <NoWritingWarning id={story._id} />
    story.parts.sort((a, b) => a.number - b.number);
    return (
      <div className="space-y-4">
        {story.parts.map((part) =>
          <div key={part.number} className="flex justify-between bg-slate-400 dark:bg-slate-700 p-2 rounded-xl md:px-8">
            <div>
              <p>{part.number}. {part.title}</p>
              <p>{truncate(part.text, 47)}</p>
            </div>
            <Link href={`/story/${story._id.toString()}/write/${part.number}`} className="flex items-center"><FontAwesomeIcon icon={faPencil} /></Link>
          </div>
        )}
      </div>
    )
  } else return null;
}
function NoWritingWarning({ id }: { id: ObjectId }) {
  return (
    <div className="flex flex-col gap-2 text-center justify-center items-center">
      <p>You haven&apos;t started writing yet!</p>
      <Link href={`/story/${id.toString()}/write/1`} className="p-2 bg-purple-300 dark:bg-purple-700 rounded-xl w-min text-nowrap"><FontAwesomeIcon icon={faPencil} /> Write</Link>
    </div>
  )
}