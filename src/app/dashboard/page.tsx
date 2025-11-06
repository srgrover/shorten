import { getSlugsByUserId } from "@/actions/slugs/get-slugs-by-user-id";
import { IoCubeOutline } from "react-icons/io5";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { DashboardTable } from "@/components/ui/DashboardTable";
import { Slug } from "@/interfaces";
import { BiPlus } from "react-icons/bi";
import { TbTagStarred } from "react-icons/tb";
import { LuWandSparkles } from "react-icons/lu";
import { Button, NewLinkModal } from "@/components";
import { SearchLinkInput } from "@/components/ui/SearchLinkInput";

export default async function DashboardPage({ searchParams }: { searchParams?: { search?: string } }) {
    const session = await auth();
    if (!session?.user) redirect('/auth/login')

    let { slugs } = await getSlugsByUserId();

    const searchParam = searchParams?.search
    const filteredLinks = slugs?.filter((s) => {
        return !searchParam || (s.url.includes(searchParam || '') || s.slug.includes(searchParam || ''))
    });

    return (
        <div className="w-full duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
            <div className="flex justify-between">
                <SearchLinkInput />

                <div className="flex gap-2 items-center justify-end">
                    <Button size="default" color="gray" variant="outline">
                        <IoCubeOutline size={16} />
                        <span className="flex self-center">{slugs!.length || 0} / 15</span>
                    </Button>

                    <Button size="default" color="gray" variant="outline">
                        <TbTagStarred size={16} />
                        <span className="flex self-center">Select a tag</span>
                    </Button>

                    <NewLinkModal tags={[]}>
                        <Button size="default" color="gray" variant="default">
                            <BiPlus size={16} />
                            Create Link
                        </Button>
                    </NewLinkModal>
                </div>
            </div>

            {
                filteredLinks!.length > 0
                    ? <DashboardTable slugs={filteredLinks as Slug[] || []} />
                    : <div className="flex flex-col gap-4 items-center justify-center">
                        <LuWandSparkles size={35} className="text-slate-700" />
                        <span className="text-gray-700">No links found</span>
                        <NewLinkModal tags={[]}>
                            <Button size="default" color="gray" variant="outline">
                                <BiPlus size={16} />
                                Create a new Link
                            </Button>
                        </NewLinkModal>
                    </div>
            }
        </div>
    )
}
