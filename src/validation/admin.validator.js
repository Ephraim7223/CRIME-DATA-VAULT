import  { z } from "zod";


export const registerValidator = z.object({
    firstname: z.string().min({message:"invalid name"}),
    lastname: z.string().min({message:"invalid name"}),
    email: z.string().email({message: "ensure it is a valid email"}),
    // role: z.enum(["Admin", "Officer"]),
    password:z.string().min(8)
}).required({message:"Fill all the field with the correct details"})


export const loginValidator = z.object({
    ID:z.string().max(20),
    password:z.string().min(8)
});