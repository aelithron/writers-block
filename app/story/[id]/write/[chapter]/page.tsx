import { NotAuthenticated, NotFoundStory } from "@/app/(ui)/errors.module";
import { auth } from "@/auth";
import { getStory } from "@/utils/db";
import { Story } from "@/writersblock";
import WriteForm from "./write.form";

export default async function Page({ params }: { params: Promise<{ id: string, chapter: string }> }) {
  const id = (await params).id;
  const chapter = (await params).chapter;
  const session = await auth();
  if (!session || !session.user || !session.user.email) return <NotAuthenticated />
  const story: Story | null = await getStory(id, session.user.email);
  if (story === null) return <NotFoundStory invalidID={id} />
  return (
    <main className="flex flex-col p-8 md:p-20 min-h-screen gap-4">
      <WriteForm storyID={id} storyType={story.type} chapter={chapter} currentText={"(placeholder text)"} currentTitle={"(placeholder title)"} />
    </main>
  )
}