import User from "../models/User.js"
import generateId from "../helpers/generateId.js"
import generateJWT from "../helpers/generateJWT.js"

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
  if(await user.checkPassword(password)){
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    })
  }else{
    const error = new Error("Your username or password did not match!")
    return res.status(403).json({msg: error.message})
  }
}

const confirm = async (req, res) => {
  const { token } = req.params
}

export { register,  authenticate, confirm }