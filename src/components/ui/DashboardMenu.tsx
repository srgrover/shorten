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
        <nav className="fixed z-50 flex w-full items-center border-b border-neutral-200 bg-white backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900">
            <div className='container mx-auto w-full'>
                <div className='flex w-full items-center justify-between'>
                    <div className='mt-0 flex flex-row space-x-0 text-sm font-medium rtl:space-x-reverse'>
                        <div className='flex items-center space-x-8'>
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
                    </div>
                </div>
            </div>
        </nav>
    )
}
