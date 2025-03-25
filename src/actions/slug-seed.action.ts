'use server'

import prisma from "@/lib/prisma";
import { seedSlugs } from "@/seed";
import { GetStaticProps } from "next";

export const createSeedData = async () => {
    // 1. Delete all data from slug table
    await prisma.slug.deleteMany();

    // 2. Insert many data from seedSlugs initial data into Slug table
    await prisma.slug.createMany({
        data: seedSlugs,
    });
}

export const getStaticProps: GetStaticProps = async () => {
    const slugs = await prisma.slug.findMany();
    return {
        props: { slugs },
        revalidate: 10,
    };
};