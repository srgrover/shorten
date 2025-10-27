import { getSlugsByUserId } from "@/actions/slugs/get-slugs-by-user-id";
import { IoCubeOutline, IoSearch } from "react-icons/io5";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { DashboardTable } from "@/components/ui/DashboardTable";
import { Slug } from "@/interfaces";
import { BiPlus } from "react-icons/bi";
import { TbTagStarred } from "react-icons/tb";
import { LuWandSparkles } from "react-icons/lu";
import { NewLinkModal } from "@/components";
import { Button } from "@radix-ui/themes/components/button";

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user) redirect('/auth/login')

    const { slugs } = await getSlugsByUserId();

    console.log(slugs)

    // if (slugs == null || slugs == undefined || slugs.length == 0) slugs = seedSlugs

    return (
        <>
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
                        <Button size="2" color="gray" variant="outline">
                            <IoCubeOutline size={16} />
                            <span className="flex self-center">{slugs!.length || 0} / 15</span>
                        </Button>

                        <Button size="2" color="gray" variant="outline">
                            <TbTagStarred size={16} />
                            <span className="flex self-center">Select a tag</span>
                        </Button>

                        <NewLinkModal tags={[]}>
                            <Button size="2" color="gray" variant="solid" highContrast>
                                <BiPlus size={16} />
                                Create Link
                            </Button>
                        </NewLinkModal>
                    </div>
                </div>

                {
                    slugs!.length > 0
                        ? <DashboardTable slugs={slugs as Slug[] || []} />
                        : <div className="flex flex-col gap-4 items-center justify-center">
                            <LuWandSparkles size={35} className="text-slate-700" />
                            <span className="text-gray-700">No links found</span>
                            <NewLinkModal tags={[]}>
                            <Button size="2" color="gray" variant="outline">
                                <BiPlus size={16} />
                                Create a new Link
                            </Button>
                        </NewLinkModal>
                        </div>
                }
            </div>
        </>
    )
}
