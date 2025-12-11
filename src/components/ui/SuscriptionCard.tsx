'use client'

import { useState } from "react"
import { Button } from "./button";
import { User } from "@/interfaces";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { currencyFormat } from "@/utils";
import { CheckIcon, StarIcon } from "lucide-react";
import { IoCart } from "react-icons/io5";
import { Suscription } from "@/interfaces/suscription.interface";
import { updateUser } from "@/actions";
import { toast } from "sonner";
import { LuLoader } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

interface Props {
    suscription: Suscription,
    user: User | null
}

export const SuscriptionCard = ({ suscription, user }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    const onSuscribe = async () => {
        setLoading(true);
        if (!user) return;
        user!.suscriptionId = suscription.id;
        const { ok, message } = await updateUser(user as User);

        if (!ok) {
            toast.error(message);
            return;
        }
    }

    return (
        // <Card className={'max-w-md' + (user && user !== undefined && user?.suscription?.id === suscription.id ? ' text-accent-foreground border-black' : '')}>
        //     <CardHeader className="flex flex-col gap-3">
        //         <div className="w-full flex justify-center items-center">
        //             <div className='mb-4 flex size-9 items-center justify-center rounded-full bg-sky-600/10 sm:mx-0 dark:bg-sky-400/10'>
        //                 <StarIcon size={20} className='size-4.5 text-sky-600 dark:text-sky-400' />
        //             </div>
        //         </div>

        //         <div>
        //             <CardTitle className="text-xl text-gray-400 font-bold font-mono">{suscription.name.toLocaleUpperCase()}</CardTitle>
        //             <CardTitle className="text-3xl text-gray-600 font-bold font-mono">{currencyFormat(suscription.price)}</CardTitle>
        //         </div>

        //         <CardDescription>{suscription.description}</CardDescription>
        //     </CardHeader>
        //     <CardContent className='text-sm flex flex-col gap-4'>
        //         <p>You can get access to:</p>
        //         <ul className="w-full first-letter:decoration-transparent list-disc list-inside text-gray-600">
        //             <li className="flex justify-between items-center w-full">
        //                 <span>
        //                     {suscription.limitLinks > 0 ? suscription.limitLinks : 'Unlimited'} links creation
        //                 </span>
        //             </li>
        //             <li className="flex justify-between items-center w-full">
        //                 <span>
        //                     {suscription.limitTags > 0 ? suscription.limitTags : 'Unlimited'} tags creation
        //                 </span>
        //             </li>
        //         </ul>
        //     </CardContent>
        //     <CardFooter>
        //         <div className="w-full mt-4 -space-x-2 hover:space-x-1">
        //             {
        //                 (user && user !== undefined) && user?.suscription?.id === suscription.id
        //                     ? <Button variant="secondary" size="sm" className="w-full" disabled>Your plan</Button>
        //                     : <Button onClick={ onSuscribe } variant="outline" size="sm" className="w-full" disabled={ loading }>
        //                         {
        //                             loading 
        //                             ? <LuLoader size={12} className="animate-spin" />
        //                             : <IoCart size={12} />
        //                         }

        //                         Get it
        //                     </Button>
        //             }
        //         </div>
        //     </CardFooter>
        // </Card>

        <Card
            key={ suscription.id }
            className={cn(
                'relative flex flex-col overflow-hidden min-h-[500px] !h-[500px]',
                (user && user !== undefined && user?.suscription?.id === suscription.id ? ' text-accent-foreground border-black' : '') && 'border-primary shadow-md'
            )}
        >
            {(user && user !== undefined) && user?.suscription?.id === suscription.id && (
                <div className="bg-primary text-primary-foreground absolute top-0 right-0 rounded-bl-lg px-3 py-1 text-xs font-medium">
                    Your plan
                </div>
            )}
            <CardHeader>
                <CardTitle>{suscription.name}</CardTitle>
                <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">
                        {suscription.specialPrice ? currencyFormat(suscription.specialPrice) : currencyFormat(suscription.price)}
                    </span>
                    <span className="text-muted-foreground ml-1 text-sm">
                        /month
                    </span>
                </div>
                <div className="mt-1 min-h-[22px] flex items-center gap-2">
                {
                    suscription.specialPrice && (<>
                        <span className="text-muted-foreground text-sm line-through">
                            {suscription.price}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                            10%
                        </Badge>
                    </>)
                }
                    </div>
                <p className="font-extrmb-2 select-all font-mono text-sm text-neutral-400 dark:text-neutral-400alight min-h-[80px] max-h-[80px]">
                    {suscription.description}
                </p>
            </CardHeader>
            <CardContent className="flex-1">
                {/* {plan.bonus && (
            <div className="bg-primary/10 mb-4 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <SparklesIcon className="text-primary h-4 w-4" />
                <span className="text-sm font-medium">
                  Bonus: {plan.bonus}
                </span>
              </div>
            </div>
          )} */}
                <ul className="space-y-2 text-sm">
                    {/* {plan.features.map((feature) => (
              <li key={feature} className="flex items-center">
                <CheckIcon className="text-primary mr-2 h-4 w-4" />
                <span>{feature}</span>
              </li>
            ))} */}
                    <li className="flex items-center">
                        <CheckIcon className="text-primary mr-2 h-4 w-4" />
                        <span>{suscription.limitLinks > 0 ? suscription.limitLinks : 'Unlimited'} links creation</span>
                    </li>
                    <li className="flex items-center">
                        <CheckIcon className="text-primary mr-2 h-4 w-4" />
                        <span>{suscription.limitTags > 0 ? suscription.limitLinks : 'Unlimited'} tags creation</span>
                    </li>
                </ul>
            </CardContent>
            <CardFooter>
                {
                    (user && user !== undefined) && user?.suscription?.id === suscription.id
                        // ? <Button variant="secondary" size="sm" className="w-full" disabled>Your plan</Button>
                        ? <Button
                            variant='secondary'
                            size="sm"
                            className="w-full"
                            disabled
                        >
                            Your plan
                        </Button>
                        : <Button onClick={ onSuscribe } variant="default" size="sm" className="w-full" disabled={ loading }>
                            {
                                loading
                                    ? <LuLoader size={12} className="animate-spin" />
                                    : <IoCart size={12} />
                            }

                            Get it
                        </Button>
                }
            </CardFooter>
        </Card>

    )
}
