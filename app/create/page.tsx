import Link from "next/link";
import CreateForm from "./create.form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen p-8 md:p-20">
      <Link href={"/"} className="bg-slate-500 border-2 border-slate-300 dark:border-slate-700 py-1 px-2 rounded-xl mb-2 w-fit hover:text-sky-500"><FontAwesomeIcon icon={faHome} /> Home</Link>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-4">Create Story</h1>
        <CreateForm />
      </div>
    </div>
  );
}