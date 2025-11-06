import { Button } from "@/components";
import Link from "next/link";
import { BiLinkAlt } from "react-icons/bi";
import { FaGithub } from "react-icons/fa6";

export default function Home() {
  return (
    <section className="flex p-15 min-h-screen justify-center mt-12">
      <div className="mx-auto max-w-[43rem]">
        <div className="text-center flex flex-col gap-3 justify-center items-center">
          <BiLinkAlt size={50} className="p-3 text-white bg-gray-800 rounded-md" />
          <h1 className="mt-6 text-5xl font-bold tracking-tight lg:text-6xl max-w-[75ch] duration-500 animate-in fade-in-5 slide-in-from-bottom-2">Manage your links easily</h1>
          <p className="text-pretty max-w-[75ch] text-sm duration-700 animate-in fade-in-5 slide-in-from-top-2 md:text-base [&:not(:first-child)]:mt-6">A simple, attractive, and modern application that allows you to create, manage, and share short links. Slgs is open source, secure, and easy to use.</p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <Button asChild size="lg" variant="default">
            <Link href="/dashboard">
              <BiLinkAlt size={16} />
              Create a link
            </Link>
          </Button>

          <Button asChild size="lg" variant="outline">
            <Link href="https://github.com/srgrover/shorten">
              <FaGithub size={16} />
              View on GitHub
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
