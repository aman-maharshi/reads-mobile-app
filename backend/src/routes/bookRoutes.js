import express from 'express'
import cloudinary from "../lib/cloudinary.js"
import Book from '../models/Book.js'
import protectRoute from '../middleware/auth.middleware.js'

const router = express.Router()

// 1. ADD NEW BOOK
router.post('/add', protectRoute, async (req, res) => {
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

// 2. GET ALL BOOKS
router.get('/all', protectRoute, async (req, res) => {
  // http://localhost:3000/api/books/all?page=1&limit=5
  try {
    const page = req.query.page || 1
    const limit = req.query.limit || 5
    const skip = (page - 1) * limit

    const books = await Book.find()
      .sort({ createdAt: -1 }) // desc
      .skip(skip)
      .limit(limit)
      .populate('user', 'username profileImage')

    const totalBooks = await Book.countDocuments()
    res.json({
      books,
      totalBooks,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit)
    })

  } catch (error) {
    console.log("Error fetching books", error)
    res.status(500).json({ message: error.message })
  }
})

// 3. DELETE BOOK
router.delete('/delete/:id', protectRoute, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)

    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }

    // check if user is the owner of the book
    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    // delete image from cloudinary
    // https://res.cloudinary.com/dkqod1t7m/image/upload/v1634522805/jadfjadfjl.png
    if (book.image && book.image.includes('cloudinary')) {
      try {
        const publicId = book.image.split('/').pop().split('.')[0] // jadfjadfjl
        await cloudinary.uploader.destroy(publicId)
      } catch (deleteError) {
        console.log("Error deleting image", deleteError)
      }
    }

    await book.deleteOne()
    res.json({ message: 'Book deleted successfully' })

  } catch (error) {
    console.log("Error deleting book", error)
    res.status(500).json({ message: error.message })
  }
})

// 4. GET BOOKS BY USER
router.get('/user', protectRoute, async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(books)

  } catch (error) {
    console.log("Error fetching user books", error)
    res.status(500).json({ message: error.message })
  }
})



export default router