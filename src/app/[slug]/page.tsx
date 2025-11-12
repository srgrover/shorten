import { getSlugByCode, incrementSlugClicksByCode } from "@/actions";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Redirecting... - slgs",
};

interface Props {
    params: {
        slug: string;
    };
}

export default async function SlugPage({params}: Props) {
    const { slug } = params;

    const { ok, slug : slugFound } = await getSlugByCode(slug);
    if(!ok) redirect('/');

    const { ok: okUpdateClick } = await incrementSlugClicksByCode(slug);
    if(!okUpdateClick) redirect('/');

    redirect(slugFound?.url!);
}
