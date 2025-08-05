import Link from "next/link";
import EditForm from "./edit.form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { NotAuthenticated, NotFoundStory } from "@/app/(ui)/errors.module";
import { getStory } from "@/utils/db";
import { auth } from "@/auth";
import { Story } from "@/writersblock";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const session = await auth();
  if (!session || !session.user || !session.user.email) return <NotAuthenticated />
  const story: Story | null = await getStory(id, session.user.email);
  if (story === null) return <NotFoundStory invalidID={id} />
  return (
    <div className="flex flex-col min-h-screen p-8 md:p-20">
      <Link href={"/"} className="bg-slate-500 border-2 border-slate-300 dark:border-slate-700 py-1 px-2 rounded-xl mb-2 w-fit hover:text-sky-500"><FontAwesomeIcon icon={faArrowLeft} /> Go Back</Link>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-4">Edit Story</h1>
        <EditForm id={id} currentTitle={story.title} currentDescription={story.description} currentType={story.type} />
      </div>
    </div>
  );
}