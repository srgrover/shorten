
'use client';

import { FaArrowsRotate } from 'react-icons/fa6';
import { LuLink, LuLoader, LuRocket, LuTags } from 'react-icons/lu';
import { Button } from './button';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createNewTag } from '@/actions';
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
import { createTagSchema } from '@/schemas';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    children: React.ReactNode
}

export const NewTagModal = ({ children }: Props) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof createTagSchema>>({
        resolver: zodResolver(createTagSchema),
        defaultValues: {
            name: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof createTagSchema>) => {
        setLoading(true);
        const { ok, message } = await createNewTag(values);

        if (!ok) {
            toast.error(message)
            setLoading(false);
            return;
        }

        toast.success("Tag created successfully");
        setLoading(false);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>{ children }</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new tag</DialogTitle>
                    <DialogDescription>
                        Fill out the form to create a new label and keep your links organized.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                    <div className="flex flex-col gap-1">
                        <label className='font-medium text-sm'>Tag name</label>
                        <Input {...register("name")} />
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>

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
