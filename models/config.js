import { MongoClient } from "mongodb";
import dotenv from "dotenv"
dotenv.config()

const uri = `mongodb+srv://kylie:${process.env.MONGODB_PW}@${process.env.MONGODB_URL}`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('MongoDB Connect')

export default client