import { z } from 'zod';

const mongoId = z
  .string()
  .regex(/^[a-f0-9]{24}$/i, 'Invalid criminal id');

export const addVisitorValidator = z.object({
    firstname:z.string().min(2).max(10),
    lastname:z.string().min(2).max(10),
    middlename:z.string().min(2).max(10),
    DOB:z.string(),
    occupation:z.string(),
    town:z.string(),
    contactLine:z.string().min(11).max(11),
    state:z.string(),
    gender:z.string(),
    height:z.string(),
    visitorAddress:z.string(),
    eyecolor:z.string(),
    weight:z.string(),
    relationshipWithInmate:z.string(),
    Frequency:z.string(),
    bloodGroup:z.string(),
    lastVisitDate:z.string(),
    criminal: mongoId,
    LGA:z.string(),
    haircolor:z.string(),
    Nationality: z.string().min(1),
    occupation: z.string().min(1),
    correctionalCenter: z.string().min(1),
    visitPurpose: z.string().min(1),
    maritalStatus: z.string().min(1),
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