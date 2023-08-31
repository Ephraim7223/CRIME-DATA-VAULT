import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema({
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
    },
    Age:{
        type:String,
        required: true,
        default: " ",
    },
    DOB: {
        type: Date,
        required: true,
    },
    Nationality:{
        type: String,
        required: true,
        default: " ",
    },
    gender: {
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true,
    },
    LGA: {
        type: String,
        required: true,
    },
    town : {
        type: String,
        required: true,
    },
    height: {
        type: String,
        required: true,
    },
    eyecolor: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        required: true,
    },
    haircolor : {
        type: String,
        required: true,
    },
    weight: {
        type: String,
        required: true,
    },
    inmateVisited:{
        type: String,
        required: true,
    },
    Frequency : {
        type: String,
        required: true,
    },
    maritalStatus : {
        type: String,
        required: true,
        default: " ",
        enum:["Married", "Single", "Divorced"]
    },
    fingerPrints: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
        contactLine :{
            type: String,
            required: true,
        },
        visitorAddress : {
            type: String,
            required: true,
            default: " "
        },
        relationshipWithInmate: {
            type: String,
            required: true,
        },
        lastVisitDate : {
            type: String,
            required: true,
        },
        visitPurpose : {
            type: String,
            required: true,
            default: " "
        },
        correctionalCenter: {
            type: String,
            required: true,
            default: " "
        },
},
    { timestamps: true}
)

const Visitor = mongoose.model('Visitor', VisitorSchema)
export default Visitor;