import Link from "next/link";

export function NotFoundStory({ invalidID }: { invalidID: string }) {
  return (
    <div className="flex flex-col min-h-screen md:p-20 p-8">
      <h1 className="font-semibold text-4xl">Story not found!</h1>
      <p>That story ID was not found!</p>
      <Link href={`/`}>Go Home</Link>
      <p className="text-sm text-slate-500">Story ID: {invalidID}</p>
    </div>
  );
}