'use client'

import { logout } from "@/actions";
import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";
import { User } from "next-auth";
import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";
import { HiCog } from "react-icons/hi2";
import { IoHomeOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";

interface Props {
    user: User;
}

const menuItems = [
    {
        name: 'Home',
        href: '/',
        icon: IoHomeOutline
    },
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: HiViewGrid
    },
    {
        name: 'Settings',
        href: '/dashboard/settings',
        icon: HiCog
    }
];

export const DropdownAvatar = ({ user }: Props) => {
    const { name, email, image } = user;

    const signOut = async() => {
        await logout();
        window.location.replace('/');
    }

    return (
        <Dropdown
            
            label={
                image
                ? <Avatar className="cursor-pointer hover:border-gray-300 hover:border-4 border-transparent border-4 rounded-full" alt="User avatar" img={ image } rounded />
                : <RxAvatar className="cursor-pointer" size={ 25 } />
            }
            arrowIcon={ false }
            inline
        >
            <DropdownHeader>
                <span className="block text-sm">{name}</span>
                <span className="block truncate text-sm font-medium">{ email }</span>
            </DropdownHeader>
            {
                menuItems.map(({name, icon, href}, index) => (
                    <DropdownItem as={ Link } href={ href } icon={ icon } key={ index }
                        className="cursor-pointer"
                    >
                        { name }
                    </DropdownItem>
                ))
            }
            <DropdownDivider />
            <DropdownItem onClick={async() => await signOut()} icon={ FaSignOutAlt }>Sign out</DropdownItem>
        </Dropdown>
    );
}
