import { Schema, model } from "mongoose";

const adminSchema = new Schema({
    ID:{
        type: String,
        unique: true,
        required: true
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    name:{
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // default:" ",
        required: true
    },
    role: {
        type:String,
        enum: ["Admin", "Officer"],
        default: "Admin",
     },
     isAdmin: {
        type: Boolean,
        default: false, // Set the default value to false for new admin users
      },
}, {
    timestamps: true
});

export const Admin = model("Admin", adminSchema)