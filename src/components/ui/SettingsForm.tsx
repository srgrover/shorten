'use client';

import { InfoIcon, SaveIcon } from 'lucide-react';
import { Input } from './input';
import { Button } from './button';
import { FieldGroup, FieldSet, FieldLegend, FieldDescription, Field, FieldLabel } from './field';
import { updateUser } from '@/actions';
import { useState } from 'react';
import { LuLoader } from 'react-icons/lu';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { updateUserDataSchema } from '@/schemas';
import { User } from '@prisma/client';
import { toast } from 'sonner';

interface Props {
    user: User
}

export const SettingsForm = ({ user }: Props) => {

    const [loading, setLoading] = useState(false);

    const { register, handleSubmit } = useForm<z.infer<typeof updateUserDataSchema>>({
        resolver: zodResolver(updateUserDataSchema),
        defaultValues: {
            name: user?.name || '',
        },
    });

    const onSubmit = async (values: z.infer<typeof updateUserDataSchema>) => {
        setLoading(true);

        if(!user) return;

        user.name = values.name;
        const { ok } = await updateUser(user);

        if (!ok) {
            toast.error("Something went wrong updating your profile")
            setLoading(false);
            return;
        }

        toast.success("Your profile has been updated successfully")
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
                <FieldSet>
                    <FieldLegend>
                        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">General profile</h2>
                    </FieldLegend>
                    <FieldDescription>
                        Update your personal information
                    </FieldDescription>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                Name
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-name-43j"
                                placeholder="Your name"
                                {...register("name")}
                                disabled={loading}
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                Email
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-number-uw1"
                                value={user?.email || ''}
                                disabled
                                required
                            />
                            <FieldDescription className="flex items-center gap-2 align-middle">
                                <InfoIcon size={12} />
                                This information is managed by your OAuth provider.
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </FieldSet>

                <Field orientation="horizontal" >
                    <Button type="submit" size='sm' className='min-w-28' disabled={loading}>
                        {loading 
                        ? <>
                            <LuLoader size={15} className="animate-spin" />
                            Saving
                        </>
                        : <>
                            <SaveIcon size={10} />
                            Save
                        </>}
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    );
};
