'use client';

import { MenuItem } from '@/interfaces/dashboardMenu';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { IoLink, IoSettingsOutline } from 'react-icons/io5'

const menuItems: MenuItem[] = [
    {
        name: 'Links',
        href: '/dashboard',
        icon: <IoLink size={ 20 } />
    },
    {
        name: 'Settings',
        href: '/dashboard/settings',
        icon: <IoSettingsOutline size={ 20 } />
    }
]

export const DashboardMenu = () => {
    const pathName = usePathname();

    return (
        <div className="bg-white w-full flex gap-9 border-b-1 border-gray-200 relative justify-start items-center mx-auto px-20">
            {
                menuItems.map((item: MenuItem) => (
                    <Link 
                        className={`flex items-center gap-2 py-3 border-b-2 ${pathName === item.href ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500'}`} 
                        href={ item.href } key={item.href}>
                            { item.icon }
                            { item.name }
                    </Link>
                ))
            }
        </div>
    )
}
