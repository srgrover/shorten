'use client'

import { login } from "@/actions";
import { useState } from "react";
import { LuLoader } from "react-icons/lu";

interface Props {
    provider: string;
    icon: React.ReactNode;
}

export const ButtonProvider = ({ provider, icon }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    const tryToLogin = async () => {
        setLoading(true);
        await login(provider)
    }

    console.log('PROVIDER',provider)

    return (
        <button
            onClick={ async() => { await tryToLogin() } }
            type="button"
            className="px-3 py-2 flex items-center w-full gap-2 justify-center shadow-sm shadow-gray-300/50 rounded-md cursor-pointer hover:bg-gray-100">
            
            { !loading ? icon : <LuLoader size={20} className="animate-spin" /> }
            Continue with { provider.toWellFormed() }
        </button>
    )
}
