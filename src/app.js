import express from "express";
import * as dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import userRoutes from './routes/user.routes.js'

dotenv.config()

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// routes
app.use(userRoutes)

export default app