import {z} from "zod"


export const addCriminalValidator =z.object({
    firstname:z.string().min(2).max(20),
    lastname:z.string().min(2).max(20),
    middlename:z.string().min(2).max(20),
    DOB:z.string(),
    crime:z.string(),
    occupation:z.string(),
    // image:z.string(),
    town:z.string(),
    bloodGroup:z.string(),
    nationality:z.string(),
    age:z.string(),
    state:z.string(),
    gender:z.string(),
    LGA:z.string(),
    reportedBy:z.string(),
    height:z.string(),
    address:z.string(),
    Contactmiddlename:z.string(),
    Contactfirstname:z.string(),
    Contactlastname:z.string(),
    eyecolor:z.string(),
    weight:z.string(),
    status:z.string(),
    haircolor:z.string(),
    contactaddress:z.string(),
    contactLine:z.string(),
    sentence:z.string(),
    dateConvicted:z.string(),
    dateCommitted:z.string(),
    correctionalCenter:z.string(),
    maritalStatus:z.string(),
    contactRelationship:z.string(),
    complexion:z.string(),
})
