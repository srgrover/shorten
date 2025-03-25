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
            className='flex flex-col gap-2 items-center justify-center'
        >
            {
                providers.map((provider) => (
                    <ButtonProvider key={provider.provider} { ...provider } />
                ))
            }
        </form>
    )
}
