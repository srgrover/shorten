'use client'

import { signOut, useSession } from "next-auth/react";
import { useState } from "react"
import { IoHomeOutline, IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { RiDashboardLine } from "react-icons/ri";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Link from "next/link";
import { LuLoader } from "react-icons/lu";

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

export const AvatarMenu = () => {
    const { data: session } = useSession();
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    if (!session) return null;
    const { user } = session;

    const tryToSignOut = async () => {
        setLoading(true);
        signOut({ callbackUrl: '/' });
    }

    return (
        <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
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
                <DropdownMenuGroup>
                    {
                        menuItems.map(({ name, icon, href }, index) => (
                            <DropdownMenuItem key={index}>
                                <Link href={href} onClick={() => setOpenMenu(false)} className="flex gap-2 px-2 py-1 items-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <DropdownMenuShortcut>{icon}</DropdownMenuShortcut>
                                    <span className="flex items-center self-center">{name}</span>
                                </Link>
                            </DropdownMenuItem>
                        ))
                    }
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem dir="left">
                    <button onClick={() => tryToSignOut()} className="text-sm flex w-full cursor-pointer gap-2 px-2 py-1 items-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        {
                            !loading ? <IoLogOutOutline size={15} /> : <LuLoader size={15} className="animate-spin" />
                        }
                        <span className="flex items-center self-center">Salir</span>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
