'use client'

import { login } from "@/actions";

interface Props {
    provider: string;
    icon: React.ReactNode;
}

export const ButtonProvider = ({ provider, icon }: Props) => {
    return (
        <button
            onClick={async() => {await login(provider)} }
            type="button"
            className="px-3 py-2 flex items-center gap-2 justify-center shadow-sm shadow-gray-400/50 rounded-md cursor-pointer hover:bg-gray-100">
            {icon}
            Signin with {provider.toWellFormed()}
        </button>
    )
}
