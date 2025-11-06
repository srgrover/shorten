'use client'

import Link from "next/link"
import { AvatarMenu } from "./AvatarMenu"
import { useSession } from "next-auth/react"
import { BiLinkAlt } from "react-icons/bi"
import { FaGithub } from "react-icons/fa6"
import { Badge } from "./badge"
import { Button } from "./button"

export const NavComponent = () => {
    const { data: session } = useSession();

    return (
        <nav className="sticky bg-white w-full flex top-0 z-50 justify-between items-center mx-auto px-20 h-20">
            <div className="inline-flex">
                <Link href="/">
                    <div className="hidden md:block">
                        <span className="text-2xl flex gap-2 items-center font-semibold text-gray-700">
                            <BiLinkAlt size={25} className="bg-gray-700 p-1 rounded text-white" />
                            slgs
                            <Badge variant="secondary">Alpha</Badge>
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
                            : <Button size="default" variant="outline" asChild>
                                <Link href="/auth/login">Get started</Link>
                            </Button>
                    }
                </div>
            </div>
        </nav>
    )
}
