import express from 'express'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

// End Points
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

    // 3. Generate token
    const token = generateToken(user._id)

    // 4. Send response with token and user details to client
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


router.post('/login', async (req, res) => {
  res.send('login')
})


export default router