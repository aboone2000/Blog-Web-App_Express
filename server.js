const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./Controllers/user_controller')
const commentRoutes = require('./Controllers/comment_controller')
const blogRoutes =
require('dotenv').config()

const app = express()

// middleware
app.use(express.json())

// routes
app.use('/user', userRoutes)
app.use('/comment', commentRoutes)

//404 Page
app.get('*', (req,res) => {
    res.send('404')
})

// db connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`listening on port ${PORT}`))