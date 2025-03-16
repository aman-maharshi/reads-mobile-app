import express from 'express'
import cloudinary from "../lib/cloudinary.js"
import Book from '../models/Book.js'

const router = express.Router()

router.post('/add', async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body

    if (!title || !caption || !rating || !image) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // upload image to cloudinary
    const response = await cloudinary.uploader.upload(image)
    const imageUrl = response.secure_url

    // save book to database
    const book = new Book({
      title,
      caption,
      rating,
      image: imageUrl,
      user: req.user._id
    })

    await book.save()
    res.status(201).json({ message: 'Book added successfully' })

  } catch (error) {
    console.log("Error creating book", error)
    res.status(500).json({ message: error.message })
  }
})

export default router