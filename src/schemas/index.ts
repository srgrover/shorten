import z from "zod";

export const createSlugSchema = z.object({
    url: z
        .url({ message: "Please enter a valid URL." })
        .min(1, { message: "Please enter a URL." }),
    slug: z
        .string()
        .min(5, { message: "Slug must be at least 5 characters." }),
    description: z
        .string()
        .max(120, { message: "The description must be less than 120 characters." })
        .optional()
});

export const deleteSlugSchema = z.object({
    slug: z
      .string()
      .min(5, "slug must be at least 5 characters.")
  })