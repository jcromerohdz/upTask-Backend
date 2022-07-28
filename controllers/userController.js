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
    await user.save()
    //res.json(storeUser)
    res.json({msg: "user created successfully, check your email to confirm your account"})
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
  const confirmUser = await User.findOne({token})
  if(!confirmUser){
    const error = new Error("Ivalid Token!!!")
    return res.status(403).json({ msg: error.message })
  }
  try {
    confirmUser.confirmed = true
    confirmUser.token = ""
    await confirmUser.save()
    res.json({msg: 'User confirmed correctly'})
  } catch (error) {
    console.log(error)
  }
}

const forgotPassword = async(req, res) => {
  const { email } = req.body
  const user = await User.findOne({email})
  if (!user) {
    const error = new Error("The user does not exist!")
    return res.status(404).json({msg: error.message})
  }

  try {
    user.token = generateId()
    await user.save()
    res.json({msg: "We have sent you an email with the instructions to reset your password!!"})
  } catch (error) {
    console.log(error)
  }
}

const checkToken = async(req, res) => {
  const { token } = req.params

  const validToken = await User.findOne({ token })

  if(validToken){
    res.json({ msg: "Valid Token and User exists!!"})
  }else{
    const error = new Error("Not a valid Token!")
    return res.status(404).json({msg: error.message})
  }

}

const newPassword = async(req, res) => {
  const { token } = req.params
  const { password } = req.body

  const user = await User.findOne({ token })

  if(user){
    user.password = password
    user.token = ''
    try {
      await user.save()
      res.json({ msg: "Password reset succefuly!"})
    } catch (error) {
      console.log(error)
    }
  }else{
    const error = new Error("Not a valid Token!")
    return res.status(404).json({msg: error.message})
  }
}

const profile = async (req, res) => {
  const { user } = req

  res.json(user)
}

export { register,  authenticate, confirm, forgotPassword, checkToken, newPassword, profile }