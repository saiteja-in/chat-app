// import cors from "cors";
import path from "path"
import dotenv from "dotenv";
import express from "express";
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.route.js'
import { app,server } from "./socket/socket.js";
// const app = express();
const PORT = process.env.PORT || 5000;

const __dirname=path.resolve()
// app.use(cors());
dotenv.config();

app.use(express.json())  //to parse incoming req from json payloads(from req.body)
app.use(cookieParser())   //to read a cookie using req 
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


app.use(express.static(path.join(__dirname,"/frontend/dist")))
app.use("*",(req,res)=>{
  res.sendFile(path.join(__dirname,'frontend','dist','index.html'))
})
app.get("/health", (req, res) => {
  res.send("health is good");
});


server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server is running at port ${PORT}`);
});
