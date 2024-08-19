import z from "zod";

export const signUpInput=z.object({
    name:z.string().min(3),
    email:z.string().email(),
    password:z.string().min(6)
})

export const signInInput=z.object({
    email:z.string().email(),
    password:z.string().min(6)
})

export const createPostInput=z.object({
    title:z.string(),
    content:z.string(),
    published:z.boolean()
})

export const updatePostInput=z.object({
    title:z.string().optional(),
    content:z.string().optional()
})

export type SignInInput = z.infer<typeof signInInput >;
export type SignUpInput = z.infer<typeof signUpInput >;
export type CreatePostInput = z.infer<typeof createPostInput >;
export type UpdatePostInput = z.infer<typeof updatePostInput >;