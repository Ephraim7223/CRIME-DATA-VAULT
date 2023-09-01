import  { z } from "zod";


export const registerValidator = z.object({
    firstName: z.string().min({message:"invalid name"}),
    middleName: z.string().min({message:"invalid name"}),
    lastName: z.string().min({message:"invalid name"}),
    email: z.string(),
    // password:z.string().min(8).regex(/^(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one capital letter and one number")
    nextOfKin: z.string(),
    nextOfKinAddress: z.string(),
    nextOfKinContact: z.string().min(11).max(11),
    height: z.string(),
    weight: z.string(),
    bloodGroup: z.string(),
    policeId: z.string(),
    DOB: z.string(),
    haircolor:z.string(),
    contactLine: z.string().min(11).max(11),
    eyeColor: z.string(),
    currentStation: z.string(),
    appointmentDate: z.string(),
    town: z.string(),
    nationality: z.string(),
    state: z.string(),
    address: z.string(),
    gender: z.string(),
    maritalStatus: z.string(),
    lga: z.string(),
    rank:z.string(),
}).required({message:"Fill all the field with the correct details"})


export const loginValidator = z.object({
    loginID: z.string().max(20),
    password: z.string().min(8)
  });