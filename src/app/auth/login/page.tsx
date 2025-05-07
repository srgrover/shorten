import { auth } from "@/auth.config"
import { LoginForm } from "./ui/LoginForm"
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await auth();
    console.log("🔍 ~ Login ~ src/app/auth/login/page.tsx:6 ~ session:", session)
    if(session) return redirect('/dashboard');
    
    return (
        <div className="flex min-w-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <LoginForm />
        </div>
    )
}