'use client'

import Link from "next/link"
import { AvatarMenu } from "./AvatarMenu"
import { useSession } from "next-auth/react"
import { CiLink } from "react-icons/ci"
import { BsLink, BsLink45Deg } from "react-icons/bs"
import { BiLinkAlt } from "react-icons/bi"
import { FaGithub } from "react-icons/fa6"

export const TopMenu = () => {
    const { data: session } = useSession();

    return (
        <>
            <nav className=" bg-white w-full flex relative justify-between items-center mx-auto px-20 h-20">
                <div className="inline-flex">
                    <Link href="/">
                        <div className="hidden md:block">
                            <span className="text-2xl flex gap-2 items-center font-semibold text-gray-700">
                                <BiLinkAlt size={25} className="bg-gray-700 p-1 rounded text-white" />
                                slgs
                            </span>
                        </div>
                    </Link>
                </div>

                <div className="flex-initial">
                    <div className="flex justify-end items-center relative">
                        <div className="flex mr-4 items-center">
                            <a className="inline-block py-2 px-2 cursor-pointer hover:bg-gray-100 rounded-md" href="https://github.com/srgrover/shorten">
                                <div className="flex items-center relative cursor-pointer whitespace-nowrap">
                                    <FaGithub size={25} />
                                </div>
                            </a>
                        </div>

                        {
                            (session?.user)
                                ? <AvatarMenu />
                                : <Link href="/auth/login" className="px-3 py-2 flex items-center justify-center shadow-sm shadow-gray-400/50 rounded-md cursor-pointer hover:bg-gray-100">Get started</Link>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}
