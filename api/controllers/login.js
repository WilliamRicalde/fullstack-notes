const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.get('/login', async (req, res) => {
  const users = await User.find()
  res.json(users)
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'invalid user or password' })
  }

  const userForToken = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    {
      expiresIn: 60 * 60 * 24 * 7
    }
  )

  res.send({
    name: user.username,
    token
  })
})

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({ username, email, passwordHash })
  const savedUser = await newUser.save()

  res.json(savedUser)
})

module.exports = router
