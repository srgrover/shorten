'use client'

import { Tag } from "@/interfaces/tag.interface"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Badge } from "./badge"
import { IoClose } from "react-icons/io5"

interface Props {
    tags: Tag[];
    selectedValue: string;
    tagsSelected: Tag[];
    handleSelectTag: (name: string) => void;
    handleRemoveTag: (tag: Tag) => void;
}

export const SelectTag = ({ tags, selectedValue, tagsSelected, handleSelectTag, handleRemoveTag }: Props) => {
    return (
        <>
            <Select value={ selectedValue } onValueChange={ handleSelectTag }>
                <SelectTrigger>
                    <SelectValue placeholder="Select a tag" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {tags.map((tag) => <SelectItem key={tag.id} value={tag.name}>{tag.name}</SelectItem>)}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {
                tagsSelected.length > 0 &&
                <div className="flex w-full rounded-md border gap-2 border-input bg-transparent p-3 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                    {
                        tagsSelected.map((tag) =>
                            <Badge variant="secondary" key={tag.id} className="p-1 flex gap-1 items-center justify-center">
                                {tag.name}
                                <button onClick={() => handleRemoveTag(tag)} className="hover:text-red-500 transition-all duration-75 self-end">
                                    <IoClose size={14} />
                                </button>
                            </Badge>)
                    }
                </div>
            }
        </>
    )
}
