import { getUserByEmail } from "@/actions";
import { auth } from "@/auth.config";
import { ItemContent, ItemTitle, ItemDescription, ItemActions, Button, Item, FieldGroup, FieldDescription, FieldLegend, FieldSet, ItemMedia, SettingsForm } from "@/components";
import { Download, Trash, Trash2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Settings - Dashboard",
};

export default async function SettingsPage() {
    const session = await auth();
    const {ok, message, user} = await getUserByEmail(session?.user!);
    
    if(!ok){
        //TODO: Create a snackbar
        alert(message);
        return;
    }
    
    return (
        <section className="grid grid-cols-1 gap-4 w-full py-[50px] duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
            <div className="flex w-full flex-col gap-6 border p-4 rounded-md">
                <SettingsForm user={user!} />
            </div>

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
