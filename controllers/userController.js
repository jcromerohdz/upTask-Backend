import User from "../models/User.js"

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
    const storeUser = await user.save()
    res.json(storeUser)
  } catch (error) {
    console.log(error)
  }

}

const createUser  = (req, res) => {
  res.json({msg: "Create User"})
}

export { register, createUser }