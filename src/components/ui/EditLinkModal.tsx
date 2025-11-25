
'use client';

import { FaArrowsRotate } from 'react-icons/fa6';
import { LuLoader, LuRocket } from 'react-icons/lu';
import { Button } from './button';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { createSlugSchema } from '@/schemas';
import { useState } from 'react';
import { toast } from 'sonner';
import { Slug } from '@/interfaces';
import { updateSlug } from '@/actions/slugs/update-slug';
import { IoLockClosed, IoLockOpen } from 'react-icons/io5';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from './input-group';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

interface Props {
    children: React.ReactNode
    slug: Slug;
}

export const EditLinkModal = ({ children, slug }: Props) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [slugLocked, setSlugLocked] = useState(true);
    const [openPopover, setOpenPopover] = useState(false);
    
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<z.infer<typeof createSlugSchema>>({
        resolver: zodResolver(createSlugSchema),
        defaultValues: {
            url: slug.url,
            slug: slug.slug,
            description: slug.description ?? '',
        },
    });

    const onSubmit = async (values: z.infer<typeof createSlugSchema>) => {
        setLoading(true);
        const linkUpdated = slug;
        linkUpdated.url = values.url;
        linkUpdated.slug = values.slug;
        linkUpdated.description = values.description ?? '';

        const { ok, message } = await updateSlug(linkUpdated);

        if (!ok) {
            toast.error(message)
            setLoading(false);
            return;
        }

        toast.success("Link updated successfully")
        setLoading(false);
        setOpen(false);
    }

    const lockUnlockSlugName = (locked: boolean) => {
        setSlugLocked(locked);
        if (slugLocked) setOpenPopover(false);
        else setValue("slug", slug.slug, { shouldValidate: true });
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
                    <DialogTitle>Edit your link</DialogTitle>
                    <DialogDescription>
                        /{slug.slug}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                    <div className="flex flex-col gap-1">
                        <label className='font-medium text-sm'>Destination URL:</label>
                        <Input {...register("url")} placeholder="https://example.com" />
                        {errors.url && <p className="text-sm text-red-500">{errors.url.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className='font-medium text-sm'>Short link:</label>
                        <InputGroup>
                            <InputGroupInput {...register("slug")} disabled={slugLocked} placeholder="Type your short link" />
                            <InputGroupAddon align="inline-end">
                                {
                                    !slugLocked &&
                                    <InputGroupButton onClick={generateRandomSlug} variant="secondary">
                                        <FaArrowsRotate size={14} />
                                        Randomize
                                    </InputGroupButton>
                                }
                                {
                                    !slugLocked
                                        ? <InputGroupButton onClick={() => lockUnlockSlugName(true)} variant="ghost" size="icon-xs">
                                            <IoLockOpen size={14} />
                                        </InputGroupButton>
                                        : <Popover onOpenChange={setOpenPopover} open={openPopover}>
                                            <PopoverTrigger asChild>
                                                <InputGroupButton variant="ghost" size="icon-xs">
                                                    {
                                                        slugLocked
                                                            ? <IoLockClosed size={14} />
                                                            : <IoLockOpen size={14} />
                                                    }
                                                </InputGroupButton>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-80">
                                                <div className="grid gap-4">
                                                    <div className="space-y-2">
                                                        <h4 className="leading-none font-medium">Unlock short link</h4>
                                                        <p className="text-muted-foreground text-sm">
                                                            This slug will be unlocked for other users. This means that other
                                                            users would use this slug to access the link and you will lost acces to him.
                                                        </p>
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <div className="grid grid-cols-1 items-center gap-4">
                                                            <Button onClick={() => lockUnlockSlugName(!slugLocked)} size="sm" variant="secondary">Yes, unlock</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                }

                            </InputGroupAddon>
                        </InputGroup>
                        {/* <div className='relative'>
                            <LuLink className='absolute left-3 top-1/2 -translate-y-1/2' size={16} />
                            <Input {...register("slug")} placeholder="MyL1nk" className="pl-9" disabled={slugLocked} />
                            <ButtonGroup>
                                <Button variant="secondary">Button</Button>
                                <ButtonGroupSeparator />
                                <Button size="icon" variant="secondary">
                                    <IconPlus />
                                </Button>
                            </ButtonGroup>

                            <Button size="icon" variant="ghost" type="button" onClick={() => setSlugLocked(!slugLocked)} className='absolute right-1 top-1/2 -translate-y-1/2 h-8'>
                                {
                                    slugLocked
                                        ? <IoLockOpen size={14} />
                                        : <IoLockClosed size={14} />
                                }
                            </Button>
                            <Button size="default" variant="ghost" type="button" onClick={generateRandomSlug} className='absolute right-5 top-1/2 -translate-y-1/2 h-8'>
                                <FaArrowsRotate size={14} />
                                <span className='font-medium text-sm ml-2'>Random</span>
                            </Button>
                        </div> */}
                        {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className='font-medium text-sm'>Description (optional):</label>
                        <Textarea {...register("description")} placeholder="Enter a description" />
                    </div>

                    {/* {
                        tags.length > 0
                            ? <div className="flex flex-col gap-1">
                                <label className='font-medium text-sm'>Add tags to your link:</label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a fruit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {tags.map((tag) => <SelectItem key={tag.id} value={tag.name}>{tag.name}</SelectItem>)}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            : <div className="p-4 border border-gray-300 rounded-md">
                                <div className="flex flex-row gap-1 justify-start items-center">
                                    <LuTags size={16} />
                                    <label className='font-medium text-sm'>You don&apos;t have any tag created.</label>
                                </div>
                            </div>
                    } */}

                    <div className="flex gap-3 mt-4 justify-end items-center">
                        <Button onClick={() => setOpen(false)} type='button' disabled={loading} variant="ghost" size="sm">Cancel</Button>
                        <Button type="submit" size="sm" disabled={loading}>
                            {
                                loading
                                    ? <><LuLoader size={15} className="animate-spin" /> Updating</>
                                    : <><LuRocket size={16} /> Update link</>
                            }
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
