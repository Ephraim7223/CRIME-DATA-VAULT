import {z} from "zod"


export const addPoliceStationValidator =z.object({
    stationName:z.string(),
    location:z.string(),
})


export const loginValidator = z.object({
    loginID: z.string().max(20),
    password: z.string().min(8)
  });