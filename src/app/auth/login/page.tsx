'use client'

import { useSession } from "next-auth/react";
import { LoginForm } from "./ui/LoginForm"
import { redirect } from "next/navigation";

export default function Login() {
    const { data: session } = useSession();

    if(session) redirect('/dashboard')
    return (
        <div className="flex min-w-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <LoginForm />
        </div>
    )
}