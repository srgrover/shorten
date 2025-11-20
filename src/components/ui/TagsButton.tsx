'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { LuPlus, LuTags } from 'react-icons/lu';
import { CheckIcon, SearchX, TagIcon } from 'lucide-react';
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from './item';
import { RiCloseLine } from 'react-icons/ri';
import { NewTagModal } from './NewTagModal';
import { Tag } from '@/interfaces/tag.interface';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';
import { DeleteTagModal } from './DeleteTagModal';

interface Props {
    tags: Tag[]
}

export const TagsButton = ({ tags }: Props) => {
    const [open, setOpen] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const param = searchParams.get("tag")?.toString();
    
    const handleClearSearch = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("tag");
        router.replace(`${pathname}`);
    }

    if (param !== undefined && tags.findIndex(t => t.id === param) === -1) {
        handleClearSearch();
    }
    
    const handleSearch = (tagId: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("tag", tagId);
        router.replace(`${pathname}?${params.toString()}`);
    }

    return (
        <Popover onOpenChange={setOpen} open={open}>
            <PopoverTrigger asChild>
                <Button size="sm" color="gray" variant="outline" className='align-middle justify-start'>
                    {
                        open ? <IoClose size={16} /> : <LuTags size={16} />
                    }
                    
                    <span className="flex self-center">
                        {
                            param !== undefined ? tags.find(t => t.id === param)?.name : 'Select a tag'
                        }
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
                <div className="grid gap-4">
                    {
                        tags.length === 0 
                        ? 
                        <div className="space-y-2 grid grid-cols-1 place-items-center">
                            <TagIcon size={35} className="text-slate-700" />
                            <p className="text-muted-foreground text-gray-700">No tags found</p>
                        </div>
                        : 
                        <div className="space-y-2">
                            <h4 className="leading-none font-medium">Tags ({ tags.length })</h4>
                            <p className="text-muted-foreground text-sm">
                                Select a tag for search.
                            </p>
                        </div>
                    }
                    
                    <div className="grid gap-2">
                        <div className="grid grid-cols-1 items-center gap-2">
                            {
                                tags.map((tag) =>
                                    <Item key={tag.id} onClick={() => handleSearch(tag.id)} variant={searchParams.get("tag")?.toString() !== undefined &&
                                        searchParams.get("tag")?.toString() === tag.id ? "muted" : "outline"} size="sm" className='py-0' asChild>
                                        <a href='#'>
                                            {
                                                searchParams.get("tag")?.toString() !== undefined &&
                                                searchParams.get("tag")?.toString() === tag.id && 
                                                (<ItemMedia>
                                                    <CheckIcon className="size-5" />
                                                </ItemMedia>)
                                            }
                                            
                                            <ItemContent>
                                                <ItemTitle>{ tag.name }</ItemTitle>
                                            </ItemContent>
                                            <ItemActions>
                                                <DeleteTagModal tag={ tag }>
                                                    <Button size="icon" color="gray" variant="ghost">
                                                        <RiCloseLine className="size-4" />
                                                    </Button>
                                                </DeleteTagModal>
                                            </ItemActions>
                                        </a>
                                    </Item>
                                )
                            }
                        </div>

                        <div className="grid grid-cols-2 items-center gap-2">
                            <Button onClick={handleClearSearch} size="sm" color="gray" variant="outline">
                                <SearchX size={16} />
                                <span className="flex self-center">Clear search</span>
                            </Button>

                            <NewTagModal>
                                <Button size="sm" color="gray" variant="default">
                                    <LuPlus size={16} />
                                    <span className="flex self-center">Create new</span>
                                </Button>
                            </NewTagModal>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};
