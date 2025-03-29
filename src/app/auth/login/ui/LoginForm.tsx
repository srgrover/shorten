import { IoLogoGithub, IoLogoGoogle } from 'react-icons/io5'
import { ButtonProvider } from "./ButtonProvider"

const providers = [
    {
        provider: 'google',
        icon: <IoLogoGoogle size={20} />
    },
    {
        provider: 'github',
        icon: <IoLogoGithub size={20} />
    }
]

export const LoginForm = () => {
    return (
        <form
            className='flex flex-col gap-8 shadow-sm p-5 items-center justify-center'
        >
            <div className='text-center'>
                <h1 className='text-3xl font-bold'>slgs</h1>
                <span className='text-sm font-mono'>Inicia sesión con tu proveedor</span>
            </div>
            <div className='flex flex-col p-5 gap-2 justify-center items-center'>
                {
                    providers.map((provider) => (
                        <ButtonProvider key={provider.provider} { ...provider } />
                    ))
                }
            </div>
        </form>
    )
}
