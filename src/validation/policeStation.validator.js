import {z} from "zod"


export const addPoliceStationValidator =z.object({
    stationName:z.string(),
    location:z.string(),
})