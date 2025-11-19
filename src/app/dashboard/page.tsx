import { getSlugsByUserId } from "@/actions/slugs/get-slugs-by-user-id";
import { IoCubeOutline } from "react-icons/io5";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { DashboardTable } from "@/components/ui/DashboardTable";
import { Slug } from "@/interfaces";
import { BiPlus } from "react-icons/bi";
import { LuWandSparkles } from "react-icons/lu";
import { Button, NewLinkModal, TagsButton } from "@/components";
import { SearchLinkInput } from "@/components/ui/SearchLinkInput";
import { getTagsByUserId } from "@/actions";
import { Tag } from "@/interfaces/tag.interface";

export default async function DashboardPage({ searchParams }: { searchParams?: { search?: string, tag?: string } }) {
    const session = await auth();
    if (!session?.user) redirect('/auth/login')

    let { slugs } = await getSlugsByUserId();
    let { tags } = await getTagsByUserId();

    const searchParam = searchParams?.search
    const tagParam = searchParams?.tag

    const filteredLinks = slugs?.filter((s) => {
        const searchFilter = !searchParam || s.slug.includes(searchParam) || s.url.includes(searchParam);
        const tagFilter = !tagParam || s.Tags.some((tag) => tag.id === tagParam);

        return searchFilter && tagFilter;
    });


    return (
        <div className="w-full my-[50px] duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
            <div className="flex justify-between">
                <SearchLinkInput />

                <div className="flex gap-2 items-center justify-end">
                    <Button size="sm" color="gray" variant="outline">
                        <IoCubeOutline size={16} />
                        <span className="flex self-center">{ slugs!.length || 0 } / 15</span>
                    </Button>

                    <TagsButton tags={ tags as Tag[] || [] } />

                    <NewLinkModal tags={[]}>
                        <Button size="sm" color="gray" variant="default">
                            <BiPlus size={16} />
                            Create Link
                        </Button>
                    </NewLinkModal>
                </div>
            </div>

            {
                filteredLinks!.length > 0
                    ? <DashboardTable slugs={filteredLinks as unknown as Slug[] || []} />
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
