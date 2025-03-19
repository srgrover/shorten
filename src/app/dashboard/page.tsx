import { Metadata } from "next";
import { BiPlus } from "react-icons/bi";
import { IoMdStats } from "react-icons/io";
import { IoCopyOutline, IoCubeOutline, IoSearch, IoSettingsOutline, IoTrashOutline } from "react-icons/io5";
import { TbTagStarred } from "react-icons/tb";

export const metadata: Metadata = {
    title: "Dashboard",
};

const links = [
    {
        slug: 'rygeas',
        url: 'https://jonathanmoya.com',
        createdAt: new Date(),
        clics: 36
    },
    {
        slug: 'thdere',
        url: 'https://minuevaweb.com',
        createdAt: new Date(),
        clics: 12
    },
    {
        slug: 'fgrhyt',
        url: 'https://estaesotraweb.com',
        createdAt: new Date(),
        clics: 23
    },
]

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between">
                <div className="relative w-full md:w-72 md:max-w-72">
                    <IoSearch size={16} className="lucide lucide-search absolute left-2 top-1/2 -translate-y-1/2 transform text-neutral-400" />
                    <input className="flex h-9 w-full rounded-md border border-neutral-300 bg-transparent px-3 py-1 
                                text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium 
                                placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 
                                focus-visible:ring-neutral-300 disabled:cursor-not-allowed disabled:opacity-50 
                                dark:border-neutral-800 dark:placeholder:text-neutral-400 
                                dark:focus-visible:ring-neutral-700 pl-8"
                        autoComplete="off"
                        placeholder="Search links"
                        type="search" />
                </div>

                <div className="flex gap-2 items-center justify-end">
                    <div className="flex rounded-md border border-neutral-300 bg-transparent px-4 py-2 
                    text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium 
                    placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 
                    focus-visible:ring-neutral-300 disabled:cursor-not-allowed disabled:opacity-50 
                    dark:border-neutral-800 dark:placeholder:text-neutral-400 
                    dark:focus-visible:ring-neutral-700 items-center gap-2">
                        <IoCubeOutline size={16} />
                        <span className="flex self-center">04 / 15</span>
                    </div>

                    <button className="flex rounded-md border border-neutral-300 bg-transparent px-4 py-2 
                    text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium 
                    placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 
                    focus-visible:ring-neutral-300 disabled:cursor-not-allowed disabled:opacity-50 
                    dark:border-neutral-800 dark:placeholder:text-neutral-400 duration-100
                    dark:focus-visible:ring-neutral-700 items-center gap-2 cursor-pointer hover:bg-gray-200">
                        <TbTagStarred size={16} />
                        <span className="flex self-center">Select a tag</span>
                    </button>

                    <button className="flex rounded-md border border-gray-900 bg-gray-900 px-4 py-2 text-white
                    text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium 
                    placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 
                    focus-visible:ring-neutral-300 disabled:cursor-not-allowed disabled:opacity-50 
                    dark:border-neutral-800 dark:placeholder:text-neutral-400 duration-100
                    dark:focus-visible:ring-neutral-700 items-center gap-2 cursor-pointer hover:bg-gray-950">
                        <BiPlus size={16} />
                        <span className="flex self-center">Create new link</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
                {
                    links.map(({slug, url, createdAt, clics}) => (
                        <div  key={slug} className="p-3 rounded bg-white border border-gray-200">
                            <div className="flex justify-between">
                                <p className="text-xl font-bold">
                                    <span className="font-light text-gray-400">/</span>
                                    { slug }
                                </p>
                                <div className="flex gap-2 items-center justify-end">
                                    <span className="cursor-default items-center space-x-1 text-xs hidden border-r border-neutral-200 pr-2 md:flex">
                                        <IoMdStats size={14} />
                                        <pre className="text-sm">{ clics } clicks</pre>
                                    </span>

                                    <div className="flex gap-3 items-center justify-end">
                                        <button className="cursor-pointer">
                                            <IoCopyOutline size={15} />
                                        </button>
                                        <button className="cursor-pointer">
                                            <IoSettingsOutline size={15} />
                                        </button>
                                        <button className="cursor-pointer">
                                            <IoTrashOutline size={15} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <p className="font-extrmb-2 truncate select-all font-mono text-sm text-neutral-400 dark:text-neutral-400alight">
                                { url }
                            </p>
                            <p className="text-right text-xs text-neutral-500">
                                { createdAt.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                }) }
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>

    );
}
