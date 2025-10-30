'use client'

import { signOut, useSession } from "next-auth/react";
import { useState } from "react"
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { RiDashboardLine } from "react-icons/ri";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./dropdown-menu";

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
        // <>
        //     <Button size="icon" onClick={() => setOpenMenu(!openMenu)} className="w-10 h-10 flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-100">
        //         {
        //             user?.image 
        //             ? <Avatar size="2" radius="full" fallback={user!.name![0]} src={user!.image!} alt={user!.name ?? 'Avatar'} />
        //             : <RxAvatar size={25} />
        //         }
        //     </Button>
        //     <div onClick={() => setOpenMenu(!openMenu)} data-state={openMenu ? 'open' : 'closed'} className={`${!openMenu && 'hidden'} fixed inset-0 z-5 data-[state=${openMenu ? 'open' : 'closed'}]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`} style={{ pointerEvents: 'auto' }}></div>

        //     <div className={`${!openMenu && 'hidden'} z-10 absolute right-0 top-7 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-auto dark:bg-gray-700 dark:divide-gray-600`}>
        //         <div className="px-4 py-4 text-sm text-gray-900 dark:text-white">
        //             <div>{ user?.name ?? 'Usuario' }</div>
        //             <div className="font-medium truncate text-xs text-gray-400">{ user?.email ?? 'Sin email' } </div>
        //         </div>
        //         <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
        //             {
        //                 menuItems.map(({name, icon, href}, index) => (
        //                     <li key={index} className="px-2 py-1">
        //                         <Link href={ href } onClick={() => setOpenMenu(false)} className="flex gap-2 px-2 py-1 items-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        //                             { icon }
        //                             <span className="flex items-center self-center">{ name }</span>
        //                         </Link>
        //                     </li>
        //                 ))
        //             }
        //         </ul>
        //         <div className="p-2">
        //             <button onClick={() => tryToSignOut()} className="text-sm flex w-full cursor-pointer gap-2 px-2 py-1 items-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        //                 {
        //                     !loading ? <IoLogOutOutline size={15} /> : <LuLoader size={15} className="animate-spin" />
        //                 }
        //                 <span className="flex items-center self-center">Salir</span>
        //             </button>
        //         </div>
        //     </div>
        // </>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Keyboard shortcuts
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Email</DropdownMenuItem>
                                <DropdownMenuItem>Message</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>More...</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                        New Team
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>GitHub</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuItem disabled>API</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => tryToSignOut()}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
