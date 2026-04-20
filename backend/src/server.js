import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import notesRoutes from "./routes/notesRoutes.js"
import dbConnect from "./config/db.js"
import rateLimiter from "./middlewares/RateLimiter.js"

dotenv.config()

const app = express()
app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json())
app.use(rateLimiter)

// app.use((req, res, next) => {
//     console.log(`request is ${req.method} and url is ${req.url}`)
//     next()
// })
app.use('/api/notes', notesRoutes)


dbConnect().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`App hase been started in PORT ${process.env.PORT}`)
    })
})

// mongodb+srv://schrtghosh_db_user:fAzL6WRour5RiMIe@cluster0.zypsbxy.mongodb.net/?appName=Cluster0