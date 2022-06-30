import User from "../models/User.js"
import generateId from "../helpers/generateId.js"

const register = async(req, res) => {
  // Avoid duplicate registrations
  const { email } = req.body
  const userExist = await User.findOne({ email })


  if(userExist) {
    const error = new Error("User already exist!")
    return res.status(400).json({msg: error.message})
  }

  try {
    const user = new User(req.body)
    user.token = generateId()
    const storeUser = await user.save()
    res.json(storeUser)
  } catch (error) {
    console.log(error)
  }

}

const authenticate = async (req, res) => {
  const { email, password } = req.body

  // Check if the user exist
  const user = await User.findOne({email})
  if (!user) {
    const error = new Error("The user does not exist!")
    return res.status(404).json({msg: error.message})
  }

  // Check for user confirmation
  if (!user.confirmed) {
    const error = new Error("Your user account is not confirmed!")
    return res.status(403).json({msg: error.message})
  }

  // Check for user password 
}



export { register,  authenticate }