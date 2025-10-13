import { getSlugsByUserId } from "@/actions/slugs/get-slugs-by-user-id";
import { IoAdd, IoCubeOutline, IoSearch } from "react-icons/io5";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { DashboardTable } from "@/components/ui/DashboardTable";
import { Slug } from "@/interfaces";
import { BiPlus } from "react-icons/bi";
import { TbTagStarred } from "react-icons/tb";
import { LuWandSparkles } from "react-icons/lu";

export default async function DashboardPage() {

    const session = await auth();
    if (!session?.user) redirect('/auth/login')

    let { slugs } = await getSlugsByUserId();

    console.log(slugs)

    // if (slugs == null || slugs == undefined || slugs.length == 0) slugs = seedSlugs

    return (
        <div className="flex flex-col gap-8">
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
                        <span className="flex self-center">{slugs!.length || 0} / 15</span>
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

            {
                slugs!.length > 0 
                ? <DashboardTable slugs={ slugs as Slug[] || [] } />
                : <div className="flex flex-col gap-4 items-center justify-center">
                    <LuWandSparkles size={35} className="text-slate-700" />
                    <span className="text-gray-700">No links found</span>
                    <button className="transform flex gap-2 cursor-pointer items-center rounded-md border border-gray-200 px-5 py-2 font-medium text-gray-900 transition-colors hover:bg-gray-50">
                        <IoAdd size={16} />
                        Create a new link
                    </button>
                </div>
            }
        </div>
    )
}