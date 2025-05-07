'use client'

import { login } from "@/actions";

interface Props {
    provider: string;
    icon: React.ReactNode;
}

export const ButtonProvider = ({ provider, icon }: Props) => {
    return (
        <button
            onClick={async(e) => {
              e.preventDefault()
              await login(provider)
            }}
            type="button"
            className="px-3 py-1 flex items-center min-w-2/3 w-100 gap-2 justify-center shadow-sm shadow-gray-400/50 rounded-md cursor-pointer hover:bg-gray-100">
            {icon}
            Signin with {provider.toWellFormed()}
        </button>
    )
}
