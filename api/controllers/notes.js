const router = require('express').Router()
const Note = require('../models/Note')

router.get('/notes', async (req, res) => {
  const notes = await Note.find()
  res.json(notes)
})

router.post('/notes', async (req, res) => {
  const { title, content, userId } = req.body

  const newNote = new Note({ title, content, userId })
  const savedNote = await newNote.save()

  res.json(savedNote)
})

module.exports = router
