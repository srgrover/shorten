import { getUserByEmail } from "@/actions";
import { auth } from "@/auth.config";
import { ItemContent, ItemTitle, ItemDescription, ItemActions, Button, Item, FieldGroup, FieldDescription, FieldLegend, FieldSet, ItemMedia, SettingsForm } from "@/components";
import { currencyFormat } from "@/utils";
import { BadgeCheckIcon, ChevronRightIcon, Download, Trash, Trash2 } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { toast } from "sonner";

export const metadata: Metadata = {
    title: "Settings - Dashboard",
};

export default async function SettingsPage() {
    const session = await auth();
    const { ok, message, user } = await getUserByEmail(session?.user!);

    if (!ok) {
        toast.error(message)
        return;
    }

    return (
        <section className="grid grid-cols-1 gap-4 w-full py-[50px] duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
            <div className="flex w-full flex-col gap-6 border p-4 rounded-md">
                <SettingsForm user={user!} />
            </div>

            <FieldGroup className="flex w-full flex-col gap-6 border p-4 rounded-md">
                <FieldSet className="flex justify-between flex-row">
                    <div>
                        <FieldLegend>
                            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Suscription</h2>
                        </FieldLegend>
                        <FieldDescription>
                            You can manage your suscription plan and chage it at any time.
                        </FieldDescription>
                    </div>

                    <div>
                        <FieldLegend>
                            <h2 className="scroll-m-20 text-2xl text-gray-300 font-semibold tracking-tight font-mono">
                                <span className="text-4xl text-slate-900 font-bold">{currencyFormat(user?.suscription?.price ?? 0)}</span>
                                /month
                            </h2>
                        </FieldLegend>
                    </div>
                </FieldSet>

                <div className="flex justify-between flex-row gap-4">
                    <Item variant="outline" size="sm" asChild className="max-h-[55px]">
                        <Link href="/suscriptions" className="hover:bg-accent hover:text-accent-foreground">
                            <ItemMedia>
                                <BadgeCheckIcon className="size-5" />
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle>Change your plan now</ItemTitle>
                            </ItemContent>
                            <ItemActions>
                                
                                <ChevronRightIcon className="size-4" />
                            </ItemActions>
                        </Link>
                    </Item>

                    <Item variant="default" className="p-0">
                        <ItemContent>
                            <ItemTitle className="text-4xl text-gray-300 font-bold font-mono">{user?.suscription?.name.toUpperCase()}</ItemTitle>
                        </ItemContent>
                    </Item>
                </div>
            </FieldGroup>

            <FieldGroup className="flex w-full flex-col gap-6 border p-4 rounded-md">
                <FieldSet>
                    <FieldLegend>
                        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Account</h2>
                    </FieldLegend>

                    <FieldDescription>
                        Manage your account settings
                    </FieldDescription>
                </FieldSet>

                <Item variant="outline">
                    <ItemContent>
                        <ItemTitle>
                            Export links
                        </ItemTitle>
                        <ItemDescription>
                            You can export your links to a JSON file.
                        </ItemDescription>
                    </ItemContent>

                    <ItemActions>
                        <Button variant="outline" size="sm" className="min-w-56">
                            <Download size={10} />
                            Export all links
                        </Button>
                    </ItemActions>
                </Item>

                <Item variant="outline" className="align-middle">
                    <ItemMedia variant="icon" className="align-middle">
                        <Trash2 size={12} />
                    </ItemMedia>
                    <ItemContent>
                        <ItemTitle>
                            Delete account
                        </ItemTitle>
                        <ItemDescription>
                            This action will remove your account from our system. This action can not undone.
                        </ItemDescription>
                    </ItemContent>

                    <ItemActions>
                        <Button variant="destructive" size="sm" className="min-w-56">
                            <Trash size={12} />
                            Delete account
                        </Button>
                    </ItemActions>
                </Item>
            </FieldGroup>
        </section>
    );
}
