// Suggested code may be subject to a license. Learn more: ~LicenseLog:2735325798.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1859535540.
'use client'

import Link from "next/link"
import { useState } from "react"
import { IoHomeOutline, IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { RiDashboardLine } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx"

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
    const [openMenu, setOpenMenu] = useState<boolean>(false)

    return (
        <>
            <button onClick={() => setOpenMenu(!openMenu)} className="w-10 h-10 flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-200">
                <RxAvatar size={25} />
            </button>
            <div onClick={() => setOpenMenu(!openMenu)} data-state={openMenu ? 'open' : 'closed'} className={`${!openMenu && 'hidden'} fixed inset-0 z-5 data-[state=${openMenu ? 'open' : 'closed'}]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`} style={{ pointerEvents: 'auto' }}></div>

            <div className={`${!openMenu && 'hidden'} z-10 absolute right-0 top-7 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-auto dark:bg-gray-700 dark:divide-gray-600`}>
                <div className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                    <div>Jonathan Moya Moreno</div>
                    <div className="font-medium truncate text-xs text-gray-400">dev.jonathan.moya@gmail.com</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                    {
                        menuItems.map((item, index) => (
                            <li key={index} className="px-2 py-1">
                                <Link href={item.href} onClick={() => setOpenMenu(false)} className="flex gap-2 px-2 py-1 items-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    {item.icon}
                                    <span className="flex items-center self-center">{item.name}</span>

                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <div className="p-2">
                    <Link href={'/'} onClick={() => setOpenMenu(false)} className="text-sm flex gap-2 px-2 py-1 items-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        <IoLogOutOutline size={15} />
                        <span className="flex items-center self-center">Salir</span>
                    </Link>
                </div>
            </div>
        </>
    )
}
