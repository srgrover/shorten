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

  export const updateUserDataSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters."),
});

export const createTagSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name tag must be at least 2 characters." })
        .max(15, { message: "The name must be less than 15 characters." })
});