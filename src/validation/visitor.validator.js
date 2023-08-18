import {z} from "zod"


export const addVisitorValidator =z.object({
    firstname:z.string().min(2).max(10),
    lastname:z.string().min(2).max(10),
    middlename:z.string().min(2).max(10),
    DOB:z.string(),
    occupation:z.string(),
    town:z.string(),
    phoneNumber:z.string().min(11).max(11),
    state:z.string(),
    gender:z.string(),
    height:z.string(),
    address:z.string(),
    eyecolor:z.string(),
    weight:z.string(),
    relationshipWithInmate:z.string(),
    Frequency:z.string(),
    bloodGroup:z.string(),
    lastVisitDate:z.string(),
    inmateVisited:z.string(),
    LGA:z.string(),
    haircolor:z.string(),
    // visitorAddress:z.string(),
    // 
    // 
    // 
    // Nationality:z.string(),
    // maritalStatus:z.string(),
    // contactLine:z.string(),
    // purpose:z.string(),
    // correctionalCenter:z.string(),
    // Age:z.string
})