
'use client';

import { FaArrowsRotate } from 'react-icons/fa6';
import { LuLink, LuLoader, LuRocket, LuTags } from 'react-icons/lu';
import type { Tag } from "@prisma/client";
import { Button } from './button';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createNewSlug } from '@/actions';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from './input';
import { Textarea } from './textarea';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createSlugSchema } from '@/schemas';
import { useState } from 'react';
import { toast } from 'sonner';
import { SelectTag } from './SelectTag';

interface Props {
    children: React.ReactNode
    tags: Tag[];
}

export const NewLinkModal = ({ children, tags }: Props) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tagsSelected, setTagsSelected] = useState([] as Tag[]);
    const [selectedValue, setSelectedValue] = useState('');

    const handleSelectTag = (value: string) => {
        setSelectedValue(value);
        const tag = tags.find(t => t.name === value);
        if (!tag) return;
        
        const noduplicates = new Set([...tagsSelected, tag]);
        setTagsSelected(Array.from(noduplicates));
    }

    const handleRemoveTag = (tag: Tag) => {
        if (tag.name === selectedValue) setSelectedValue('');
        setTagsSelected(tagsSelected.filter(t => t.id !== tag.id))
    }

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<z.infer<typeof createSlugSchema>>({
        resolver: zodResolver(createSlugSchema),
        defaultValues: {
            url: "",
            slug: "",
            description: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof createSlugSchema>) => {
        setLoading(true);
        const { ok, message } = await createNewSlug(values, tagsSelected);

        if (!ok) {
            toast.error(message)
            setLoading(false);
            return;
        }

        setOpen(false);
    }

    const generateRandomSlug = () => {
        const randSlug = Math.random().toString(36).substring(7);
        setValue("slug", randSlug, { shouldValidate: true });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new link</DialogTitle>
                    <DialogDescription>
                        Complete the form below to add a new link.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                    <div className="flex flex-col gap-1">
                        <label className='font-medium text-sm'>Destination URL*</label>
                        <Input {...register("url")} placeholder="https://example.com" />
                        {errors.url && <p className="text-sm text-red-500">{errors.url.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className='font-medium text-sm'>Short link*:</label>
                        <div className='relative'>
                            <LuLink className='absolute left-3 top-1/2 -translate-y-1/2' size={16} />
                            <Input {...register("slug")} placeholder="MyL1nk" className="pl-9" />
                            <Button size="default" variant="ghost" type="button" onClick={generateRandomSlug} className='absolute right-1 top-1/2 -translate-y-1/2 h-8'>
                                <FaArrowsRotate size={14} />
                                <span className='font-medium text-sm ml-2'>Random</span>
                            </Button>
                        </div>
                        {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className='font-medium text-sm'>Description (optional):</label>
                        <Textarea {...register("description")} placeholder="Enter a description" />
                    </div>

                    {
                        tags.length > 0
                            ? <div className="flex flex-col gap-1">
                                <label className='font-medium text-sm'>Add tags to your link:</label>
                                <SelectTag tags={ tags } selectedValue={ selectedValue } tagsSelected={ tagsSelected } handleSelectTag={ handleSelectTag } handleRemoveTag={ handleRemoveTag } />
                            </div>
                            : <div className="p-4 border border-gray-300 rounded-md">
                                <div className="flex flex-row gap-1 justify-start items-center">
                                    <LuTags size={16} />
                                    <label className='font-medium text-sm'>You don&apos;t have any tag created.</label>
                                </div>
                            </div>
                    }

                    <div className="flex gap-3 mt-4 justify-end items-center">
                        <Button onClick={() => setOpen(false)} type='button' disabled={loading} variant="ghost" size="sm">Cancel</Button>
                        <Button type="submit" size="sm" disabled={loading}>
                            {
                                loading
                                    ? <><LuLoader size={15} className="animate-spin" /> Creating</>
                                    : <><LuRocket size={16} /> Create</>
                            }
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
