'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { deleteSlugSchema } from "@/schemas"
import { IoTrashOutline } from "react-icons/io5"
import { Trash } from "lucide-react"
import { useState } from "react"
import { LuLoader } from "react-icons/lu"
import { deleteSlug } from "@/actions"

interface Props {
  slug: string;
}

export function DeleteButtonModal({ slug }: Props) {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof deleteSlugSchema>>({
    resolver: zodResolver(deleteSlugSchema),
    defaultValues: {
      slug: "",
    },
  });

  const onSubmit = async(data: z.infer<typeof deleteSlugSchema>) => {
    setLoading(true);
    console.log(data);
    
    if (data.slug !== slug) {
      toast.error("The slug does not match.");
      setLoading(false);
      return;
    }

    const { ok } = await deleteSlug(data);

    if (!ok) {
      
    }
    // TODO: Crear action server para eliminar el slug
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="cursor-pointer">
          <IoTrashOutline size="15" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex gap-2">
          <DialogTitle>Delete /{slug}</DialogTitle>
          <DialogDescription className="text-red-500">
            Access to the link will be permanently removed. This action cannot be undone.
          </DialogDescription>
          <DialogDescription className="mt-2">
            <pre>
              Type <span className="underline">{slug}</span> to confirm.
            </pre>
          </DialogDescription>
        </DialogHeader>
        
        <form id="form-rhf-demo" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="slug" className="sr-only">
                Link
              </Label>
              <Input
                id="slug"
                defaultValue=""
                {...register("slug")}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end mt-5">
            <DialogClose asChild>
              <Button size="sm" type="button" variant="ghost" disabled={ loading }>
                Cancel
              </Button>
            </DialogClose>
            <Button size="sm" type="submit" variant="destructive" disabled={ loading }>
              {
                  loading
                  ? <><LuLoader size={15} className="animate-spin" /> Deleting</>
                  : <><Trash size={16} /> Delete</>
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
