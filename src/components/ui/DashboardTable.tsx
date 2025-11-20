import { Slug } from "@/interfaces";
import { IoMdStats } from "react-icons/io";
import { IoCopyOutline, IoSettingsOutline } from "react-icons/io5";
import { DeleteButtonModal } from "./DeleteButtonModal";

interface Props {
    slugs: Slug[];
}

export const DashboardTable = ({ slugs }: Props) => {
    return (
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
            {
                slugs.map(({ slug, url, createdAt, clicks }) => (
                    <div key={slug} className="p-3 rounded bg-white border border-gray-200">
                        <div className="flex justify-between">
                            <a href={`/${slug}`} target="_blank" rel="noopener noreferrer" className="block space-x-[2px] font-medium transition-opacity duration-75 hover:opacity-100">
                                <span className="text-sm opacity-30!">/</span>
                                {slug}
                            </a>
                            <div className="flex gap-2 items-center justify-end">
                                <span className="cursor-default items-center space-x-1 text-xs hidden border-r border-neutral-200 pr-2 md:flex">
                                    <IoMdStats size={14} />
                                    <pre className="text-sm">{clicks} clicks</pre>
                                </span>

                                <div className="flex gap-3 items-center justify-end">
                                    <button className="cursor-pointer hover:text-black/50 transition-all duration-75">
                                        <IoCopyOutline size={15} />
                                    </button>
                                    <button className="cursor-pointer hover:text-black/50 transition-all duration-75">
                                        <IoSettingsOutline size={15} />
                                    </button>
                                    <DeleteButtonModal slug={ slug } />
                                </div>
                            </div>
                        </div>
                        <p className="font-extrmb-2 truncate select-all font-mono text-sm text-neutral-400 dark:text-neutral-400alight">
                            {url}
                        </p>
                        <p className="text-right text-xs text-neutral-500">
                            {createdAt.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </p>
                    </div>
                ))
            }
        </div>
    )
}