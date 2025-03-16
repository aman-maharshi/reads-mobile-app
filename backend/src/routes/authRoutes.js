import express from 'express'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

// REGISTER USER
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body

    // 1. Validation Checks
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be atleast 6 characters long' })
    }

    if (username.length < 3) {
      return res.status(400).json({ error: 'Username must be atleast 3 characters long' })
    }

    const existingUsername = await User.findOne({ username })
    if (existingUsername) {
      return res.status(400).json({ error: 'Username already exists' })
    }

    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already exists' })
    }

    // 2. Create new user
    const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
    const user = new User({
      username,
      email,
      password,
      profileImage
    })

    await user.save()

    // 3. Generate token and send response
    const token = generateToken(user._id)

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage
      }
    })
  } catch (error) {
    console.log("Error registering user", error)
    res.status(500).json({ error: 'Internal server error' })
  }
})


// LOGIN USER
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // 1. Validation Checks
    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    // 2. Generate token
    const token = generateToken(user._id)
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage
      }
    })


  } catch (error) {
    console.log("Error logging in user", error)
    res.status(500).json({ error: 'Internal server error' })
  }
})


export default router