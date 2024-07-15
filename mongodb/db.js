import mongoose from "mongoose";
import { config } from "dotenv";
config();
const MONGO_URI=process.env.MONGO_URI;

const connecToMongoDb=async ()=>{
    try {
        await mongoose.connect(MONGO_URI);
    } catch (error) {
        console.log({error});
    }
}

export default connecToMongoDb