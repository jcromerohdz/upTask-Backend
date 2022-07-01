import express from "express"
const router = express.Router()

import { register, 
         authenticate, 
         confirm, 
         forgotPassword, 
         checkToken, 
         newPassword,
         profile } from '../controllers/userController.js'
import checkAuth from '../middleware/checkAuth.js'


// Authentication, Register and User confirmations
router.post("/", register) // create a new user
router.post("/login", authenticate)
router.get("/confirm/:token", confirm)
router.post("/forgot-password", forgotPassword)
router.get("/forgot-password/:token", checkToken)
router.post("/forgot-password/:token", newPassword)

router.get("/profile", checkAuth, profile)


export default router