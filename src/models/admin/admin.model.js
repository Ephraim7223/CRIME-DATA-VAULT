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
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email address'],
    },
    password: {
        type: String,
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

// Define a pre-save hook to remove spaces from the email
adminSchema.pre('save', function(next) {
    if (this.email) {
        this.email = this.email.replace(/\s/g, ''); // Remove all spaces
    }
    next();
});


export const Admin = model("Admin", adminSchema)