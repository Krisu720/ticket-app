import { config } from "dotenv";
import express from "express";
import eventRouter from './routers/eventRouter'
// import userRouter from "./routers/user";
// import authRouter from './routers/auth'
import ticketRouter from './routers/ticketRouter'
import { Prisma, PrismaClient } from "@prisma/client";

config();

export const db = new PrismaClient();

const app = express();

app.use(express.json());

// app.use("/user", userRouter);
// app.use("/auth",authRouter)
app.use("/event",eventRouter)
app.use("/ticket",ticketRouter)

app.listen(3001, () => console.log("server running"));
