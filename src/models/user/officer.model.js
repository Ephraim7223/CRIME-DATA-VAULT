import { Schema, model } from "mongoose";

function validateEmail(email) {
    const emailRegex = /\S+@gmail.com\S+@email.com\.\S+/;
    return emailRegex.test(email);
  }
  

const officerSchema = new Schema({

    loginID: { type: String, required: true,default: " "},
    password: { type: String, required: true ,default: " "},
    ID: {
        type: String,
        unique: true,
        required: true  // Fixed typo here
    },
    name:{
        type: String,       
    },
    firstName: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    lga: {
        type: String,
        required: true,
    },
    nationality:{
        type: String,
        required:true
    },
    appointmentDate: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
        required: true,
    },    
    contactLine: {
        type: String,
        required: true,
    },    
    policeId: {
        type: String,
        required: true,
        unique: true
    },
    nextOfKinAddress: {
        type: String,
        required: true,
    },   
    nextOfKinContact: {
        type: String,
        required: true,
    },   
    gender: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: validateEmail,
            message: "Invalid email address",
          },
        match: [/\S+@\S+\.\S+/, 'Invalid email address'],
    },
    currentStation: {
        type:String,
        required:true
    },
    town:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required: true
    },
    height:{
        type:String,
        required: true
    },
    bloodGroup:{
        type:String,
        required: true
    },
    DOB:{
        type:String,
        required: true
    },
    nextOfKin:{
        type:String,
        required: true
    },
    weight:{
        type:String,
        required: true
    },
    eyeColor:{
        type:String,
        required: true
    },
    haircolor:{
         type:String,
        required: true
    },
    rank: {
        type:String,
        required: true
    },
    fingerPrints: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    activeSession: {
        type: Boolean,
        default: false, // Default status is offline
    },
}, {
    timestamps: true
});
// Define a pre-save hook to remove spaces from the email
officerSchema.pre('save', function(next) {
    if (this.email) {
        this.email = this.email.replace(/\s/g, ''); // Remove all spaces
    }
    next();
});


export default model("Officer", officerSchema)
