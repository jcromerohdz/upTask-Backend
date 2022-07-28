import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import projectRoutes from "./routes/projectRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"

const app = express()
app.use(express.json())
dotenv.config()

connectDB()

// CORS configuration
const whitelist = ['http://127.0.0.1:5173']

const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin)
    if (whitelist.includes(origin)) {
      // Can consult the API
      callback(null, true)
    }else {
      // The request not allow
      callback(new Error("CORS error"))
    }
  }
}

app.use(cors(corsOptions))

// Routing
app.use("/api/users", userRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/tasks", taskRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})