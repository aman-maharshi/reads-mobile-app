import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const protectRoute = async (req, res, next) => {
  try {
    // get token
    const token = req.headers.authorization.split(" ")[1] // Bearer token
    if (!token) {
      return res.status(401).json({ message: "No token" })
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // find user by id
    const user = await User.findById(decoded.id).select("-password")

    if (!user) {
      return res.status(404).json({ message: "Token is not valid" })
    }

    req.user = user
    next()

  } catch (error) {
    console.log("Error in middleware", error)
    res.status(401).json({ message: "Not authorized, token failed" })
  }
}

export default protectRoute