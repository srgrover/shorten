import { Button } from "@/components";
import Link from "next/link";
import { BiLinkAlt } from "react-icons/bi";
import { FaGithub } from "react-icons/fa6";

export default function Home() {
  return (
    <section className="flex p-15 min-h-screen justify-center">
      <div className="mx-auto max-w-[43rem]">
        <div className="text-center flex flex-col gap-3 justify-center items-center">
          <BiLinkAlt size={50} className="p-3 text-white bg-gray-800 rounded-md" />
          <h1 className="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight">Slgs</h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-400">Una aplicación para simplificar direcciones url, acortando los enlaces para hacerlos mas amigables. Porque la vida ya es demasiado compleja, simplifica todo lo que puedas.</p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <Button asChild size="lg" variant="default">
            <Link href="/dashboard">
              <BiLinkAlt size={16} />
              Create a link
            </Link>
          </Button>
          {/* <Link href="/dashboard" className="flex gap-2 items-center transform rounded-md bg-gray-700 px-5 py-3 font-medium text-white transition-colors hover:bg-gray-900">
            <BiLinkAlt size={16} />
            Create a link
          </Link> */}
          <Button asChild size="lg" variant="outline">
            <Link href="https://github.com/srgrover/shorten">
              <FaGithub size={16} />
              View on GitHub
            </Link>
          </Button>
          {/* <a href="https://github.com/srgrover/shorten" className="transform flex gap-2 items-center rounded-md border border-slate-200 px-5 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-50">
            <FaGithub size={16} />
            View on GitHub
          </a> */}
        </div>
      </div>
    </section>
  );
}
