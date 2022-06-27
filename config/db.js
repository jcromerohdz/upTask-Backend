import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI,{
      useUnifiedTopology: true,
      useNewUrlParser: true
    })

    const url = `${conn.connection.host}: ${conn.connection.port}`
    console.log(`MongoDB Connected to: ${url}`)
    
  } catch (error) {
    console.log(`error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB