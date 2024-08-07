
//pm
import mongoose from "mongoose";
import express from 'express'
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import cors from 'cors';
import { config } from "dotenv";
import path from 'path'


//fm

import userRoute from "./Routes/userRoute.js";
import messageRoute from "./Routes/messageRoute.js"
import mainRoute from "./Routes/mainRoute.js"
import { app, server } from "./socket/socket.js";

config();


//env
console.log(process.env.MONGO_DB);

const port = process.env.PORT || 4000; 

const __dirname = path.resolve()

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"/client/dist")))

// middleware routes
app.use("/api/auth" , userRoute);
app.use("/api/message" , messageRoute);
app.use("/api/users" , mainRoute);

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

server.listen(port, () => {
    console.log(`listening to port ${port}`);
});

const connect_DB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
connect_DB();