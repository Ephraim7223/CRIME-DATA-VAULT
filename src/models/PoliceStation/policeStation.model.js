import mongoose from "mongoose";

const policeStationSchema = new mongoose.Schema({
  stationName: { type: String, required: true },
  location: { type: String, required: true },
  officers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Officers' }],
  ID: { type: String, required: true, unique: true }
},
     { timestamps: true}
);

const PoliceStation = mongoose.model('PoliceStation', policeStationSchema);
export default PoliceStation;
