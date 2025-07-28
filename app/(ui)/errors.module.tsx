import { faHome, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "@/auth";
import Link from "next/link";

export function NotFoundStory({ invalidID }: { invalidID: string }) {
  return (
    <div className="flex flex-col min-h-screen md:p-20 p-8">
      <h1 className="font-semibold text-4xl">Story not found!</h1>
      <p>That story ID was not found!</p>
      <Link href={`/`} className="flex w-fit items-center gap-1 rounded-lg bg-slate-500 p-1 border-2 border-slate-700"><FontAwesomeIcon icon={faHome} /> Go Home</Link>
      <p className="text-sm text-slate-500">Story ID: {invalidID}</p>
    </div>
  );
}
export function NotAuthenticated() {
  return (
    <div className="flex flex-col min-h-screen md:p-20 p-8">
      <h1 className="font-semibold text-4xl">Not logged in!</h1>
      <p>You aren&apos;t logged in.</p>
      <form
        action={async () => {
          "use server"
          await signIn()
        }}
      >
        <button type="submit" className="flex w-fit items-center gap-1 rounded-lg bg-slate-500 p-1 border-2 border-slate-700"><FontAwesomeIcon icon={faRightToBracket} /> Log in</button>
      </form>
    </div>
  );
}