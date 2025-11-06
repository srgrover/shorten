'use client'

import { ArrowUpRight, Heart } from "lucide-react"
import Link from "next/link"
import { FaLinkedin, FaLinkedinIn } from "react-icons/fa6"
import { RiLinkedinBoxLine } from "react-icons/ri"

export const FooterComponent = () => {
    return (
        <footer className="w-full p-3 px-20 m-auto flex justify-between">
            <div>
                <span className="flex align-middle gap-1 justify-start items-center text-slate-700 text-sm">
                    Developed by Jonathan Moya with
                    <Heart size={16} className="text-red-500" />
                    using 
                    <Link className="flex align-middle gap-1 justify-start items-center text-slate-700 text-sm hover:underline" href="https://nextjs.org">
                        Next.js
                        <ArrowUpRight size={16} />
                    </Link>
                </span>
            </div>
            <div>
                <Link href="" className="flex align-middle gap-1 justify-start items-center text-slate-700 text-sm hover:underline">
                    <RiLinkedinBoxLine size={25} className="text-slate-700" />
                    LinkedIn
                    <ArrowUpRight size={16} />
                </Link>
            </div>
        </footer>
    )
}
