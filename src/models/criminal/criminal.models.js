import mongoose from "mongoose";

const criminalSchema = new mongoose.Schema({
    ID : {
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type: String,       
    },
    firstname: {
        type: String,
        required: true,
        min: 4,
        max: 30,
    },
    middlename: {
        type: String,
        required: true,
        min: 4,
        max: 30,
    },
    lastname: {
        type: String,
        required: true,
        min: 4,
        max: 30,
    },    Age: {
        type: String,
        required: true,
        default: " ",
    },
    DOB: {
        type: String,
        required: true,
    },
    occupation : {
        required: true,
        type: String,
    },
    state: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum:["Robbery","Murder","Sexual Assault","Cybercrime","Kidnapping"],
    },
    reportedBy: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        default: " "
    },
    nationality:{
        type: String,
        required: true,
    },
    complexion:{
        type: String,
        required: true,
    },
    LGA: {
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true
    },
    town: {
        type: String,
        required: true,
    },
    status:{
        type:String,
        enum:["Pending Trial","Pending Arrest","Arrested","arrested","pending trial", "pending arrest"],
        default:"Pending Trial"
      },
    weight: {
        type: String,
        required: true,
    },
    age: {
        type:String,
        required: true,
    },
    height: {
        type: String,
        required: true,
    },  
    fingerPrints: {
        type: String,
        required: true,
        default:" "
    },
    image: {
        type: String,
        required: true,
        default: " "
    },
    haircolor: {
        type: String,
        required: true,
    },
    eyecolor: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    maritalStatus : {
        type: String,
        required: true,
        default:"Single",
        enum:["Married", "Single", "Divorced"]
    },
    
        Contactfirstname: {
            type: String,
            required: true,
            default:" "
        },
        Contactmiddlename: {
            type: String,
            required: true,
            default:" "
        },
        Contactlastname : {
            type: String,
            required: true,
            default:" "
        },
        contactNumber : {
            type: String,
            required: true,
            default:" "
        },
        contactaddress:{
            type: String,
            required: true,
            default:" "
        },
        contactRelationship:{
            type: String,
            required: true,
            default:" "
        },
        crime: {
            type: String,
            required: true,
        },
        dateCommitted: {
            type: String,
            required: true,
            default:" "
        },
        dateConvicted: {
            type: String,
            required: true,
            default: " "
        },
        correctionalCenter: {
            type: String,
            required: true,
            default:" "
        },
        sentence: {
            type: String,
            required: true,
            default:" "
        },
        approved: {
            type: Boolean,
            default: false, // By default, the record is not approved
        },
        updatePending: {
            type: Boolean,
            default: false,
        },
        adminApproved: {
            type: Boolean,
            default: false,
          }
},
    { timestamps: true}
)

const Criminal = mongoose.model('Criminal', criminalSchema)
export default Criminal;
