const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()

// middleware
app.use(express.json())

// routes
app.use('/user', userRoutes)
app.use('/comment', commentRoutes)

//404 Page
app.get('*', (req,res) => {
    res.redirect('error404')
})

// db connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`listening on port ${PORT}`))