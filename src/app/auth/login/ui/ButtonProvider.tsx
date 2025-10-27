'use client'

import { login } from "@/actions";
import { Button } from "@radix-ui/themes";
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
        <Button
            color="gray"
            variant="outline"
            size="2"
            onClick={ async() => { await tryToLogin() } }
            type="button"
            highContrast>
            { !loading ? icon : <LuLoader size={20} className="animate-spin" /> }
            Continue with { provider.toWellFormed() }
        </Button>
    )
}
