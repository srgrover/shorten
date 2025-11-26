'use client'

import { signOut } from "next-auth/react";
import { useState } from "react"
import { IoHomeOutline, IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { RiDashboardLine } from "react-icons/ri";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Link from "next/link";
import { LuLoader } from "react-icons/lu";
import { User } from "@/interfaces";

const menuItems = [
    {
        name: 'Inicio',
        href: '/',
        icon: <IoHomeOutline size={15} />
    },
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: <RiDashboardLine size={15} />
    },
    {
        name: 'Settings',
        href: '/dashboard/settings',
        icon: <IoSettingsOutline size={15} />
    }
];

interface Props {
    user: User | null
}

export const AvatarMenu = ({ user }: Props) => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    if (!user) return null;

    const tryToSignOut = async () => {
        setLoading(true);
        signOut({ callbackUrl: '/' });
    }

    return (
        <DropdownMenu open={openMenu} onOpenChange={setOpenMenu} modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Submit">
                    <Avatar>
                        <AvatarImage src={user!.image!} alt={user!.name ?? 'Avatar'} />
                        <AvatarFallback>{user!.name![0]}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>{user!.name}</DropdownMenuLabel>
                <DropdownMenuLabel>
                    <p className="text-xs text-gray-400">{user!.email}</p></DropdownMenuLabel>

                <DropdownMenuSeparator />
                
                <DropdownMenuLabel className="flex justify-between">
                    <span className="text-xs">
                        Your plan
                    </span>
                    <span className="text-xs text-gray-400">
                        {user!.suscription?.name}
                    </span>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    {
                        menuItems.map(({ name, icon, href }, index) => (
                            <DropdownMenuItem asChild key={index}>
                                <Link href={href} onClick={() => setOpenMenu(false)} className="text-sm cursor-pointer flex gap-2 px-2 py-1 items-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    {icon}
                                    <span className="flex items-center self-center">{name}</span>
                                    <DropdownMenuShortcut></DropdownMenuShortcut>
                                </Link>
                            </DropdownMenuItem>
                        ))
                    }
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => tryToSignOut()} className="text-sm cursor-pointer flex gap-2 px-2 py-1 items-center rounded-md hover:bg-gray-100">
                    {
                        !loading ? <IoLogOutOutline size={15} /> : <LuLoader size={15} className="animate-spin" />
                    }
                    <span className="flex items-center self-center">Salir</span>
                    <DropdownMenuShortcut></DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
