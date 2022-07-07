import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"

const app = express()
app.use(express.json())
dotenv.config()

connectDB()

// Routing
app.use("/api/users", userRoutes)
app.use("/api/projects", userRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})