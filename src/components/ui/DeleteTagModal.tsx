
'use client';

import { LuLoader, LuTrash } from 'react-icons/lu';
import type { Tag } from "@prisma/client";
import { Button } from './button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { deleteTag } from '@/actions';
import { useState } from 'react';
import { toast } from 'sonner';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
    children: React.ReactNode
    tag: Tag;
}

export const DeleteTagModal = ({ children, tag }: Props) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();
    const param = searchParams.get("tag")?.toString();

    const onDeleteTag = async () => {
        setLoading(true);
        const { ok, message } = await deleteTag(tag.id);

        if (!ok) {
            toast.error(message)
            setLoading(false);
            return;
        }

        if (param !== undefined && tag.id === param) {
            const pathname = usePathname();
            const router = useRouter();
            const params = new URLSearchParams(searchParams);
            params.delete("tag");
            router.replace(`${pathname}`);
        }

        toast.success("Tag deleted successfully");
        setLoading(false);
        setOpen(false);
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>{ children }</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete { tag.name } tag</DialogTitle>
                    <DialogDescription>
                        Delete the tag will not delete the links associated with it.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button type="button" onClick={() => onDeleteTag()} variant="destructive" size="sm" disabled={ loading }>
                        {
                            loading
                            ? <><LuLoader size={15} className="animate-spin" /> Deleting</>
                            : <><LuTrash size={16} /> Delete tag</>
                        }
                    </Button>
                </DialogFooter> 
            </DialogContent>
        </Dialog>
    );
};
