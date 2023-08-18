import mongoose from "mongoose";

const crimeSchema = new mongoose.Schema({

});
const Crime = mongoose.model('Crime', crimeSchema)
export default Crime;