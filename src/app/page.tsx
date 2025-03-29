import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { DiGithub } from "react-icons/di";
import { FaArrowRight } from "react-icons/fa6";

export default function Home() {
  return (
    <section className="flex p-15 min-h-screen justify-center bg-white">
      <div className="mx-auto max-w-[43rem]">
        <div className="text-center">
          <p className="text-lg font-medium leading-8 text-neutral-600/95">Simplificando la vida</p>
          <h1 className="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black">Slgs</h1>
          <p className="mt-3 text-lg leading-relaxed font-mono text-slate-400">Una aplicación para simplificar direcciones url, acortando los enlaces para hacerlos mas amigables. Porque la vida ya es demasiado compleja, simplifica todo lo que puedas.</p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <Link href={'/auth/login'} className="flex gap-2 items-center transform rounded-md bg-gray-700 px-5 py-3 font-medium text-white transition-colors hover:bg-gray-900">
            Get starter
            <FaArrowRight size={16} />
          </Link>
          <Link href="#" 
            className="transform rounded-md border flex gap-2 items-center border-slate-200 px-5 py-3 font-medium 
            text-slate-900 transition-colors hover:bg-slate-50"> 
            <BsGithub size={16} />
              View on Github 
            </Link>
        </div>
      </div>
    </section>
  );
}
