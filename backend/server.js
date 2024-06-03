import dotenv from "dotenv";
import express from "express";
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from './routes/message.routes.js'
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json())  //to parse incoming req from json payloads(from req.body)
app.use(cookieParser())   //to read a cookie using req 
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("sajfaliteja there");
});


app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server is running at port ${PORT}`);
});
