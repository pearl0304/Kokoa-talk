import mongoClient from 'mongoose';
import dotenv from "dotenv";
dotenv.config()

const MONGO_URI = `mongodb+srv://kylie:${process.env.MONGODB_PW}@${process.env.MONGODB_URL}`;
mongoClient
.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to mongodb Successfully'))
.catch(e => console.error(e));

export default mongoClient