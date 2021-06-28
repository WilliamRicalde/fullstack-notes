const router = require('express').Router()

router.post('/login', (req, res) => {
  const { username, email, password } = req.body

  res.json({
    data: {
      username,
      email,
      password
    }
  })
})

module.exports = router
