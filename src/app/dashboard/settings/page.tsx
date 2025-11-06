import { ItemContent, ItemTitle, ItemDescription, ItemActions, Button, Item, Field, FieldGroup, FieldDescription, FieldLabel, FieldLegend, FieldSeparator, FieldSet, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea, ItemMedia } from "@/components";
import { Download, InfoIcon, SaveIcon, Trash, Trash2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Settings - Dashboard",
};

export default function SettingsPage() {
    return (
        <section className="grid grid-cols-1 gap-4 w-full py-[50px]">
            <div className="flex w-full flex-col gap-6 border p-4 rounded-md">
                <form>
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
                                        placeholder="Evil Rabbit"
                                        required
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        id="checkout-7j9-card-number-uw1"
                                        placeholder="1234 5678 9012 3456"
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
                            <Button type="submit">
                                <SaveIcon size={10} />
                                Save
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
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

                <Item variant="outline">
                <ItemMedia variant="icon">
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
