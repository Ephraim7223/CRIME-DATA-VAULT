import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import routers from "./src/routes/index.js";
import { connectDB } from "./src/Mongodb/db.js";
import { scheduledJob } from "./src/controllers/schedule.controller.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routers(app);

const startServer = async () => {
  const PORT = process.env.PORT || 8888;
  try {
    connectDB(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Start the scheduling logic
    scheduledJob();

    app.listen(PORT, () => console.log(`Server port: ${PORT} `));
  } catch (error) {
    console.log(error);
  }
};

startServer();
