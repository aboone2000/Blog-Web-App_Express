const router = require('express').Router()
const blog = require('../Models/blog')
const comment = require('../models/comment')
const User = require('../models/user')


router.get('/', async (req, res) => {
    try {
        let blogs = await blog.find()
        res.send(blogs)
    } catch (error) {
        console.log(error)
        res.status(500).json({ 'message': 'no new blog' })
    }
})

router.post('/blog', async (req,res) => {
    try{
        const{username, password} = req.body
        const foundBlog = await new Blog({
            username,
            password

        }).save()

        res.json({'message': 'blog created'})
    } catch (error) {
        res.status(400).json({"message": String(error)})
    }
})

        


router.delete('/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params
        const User = await User.findOneAndDelete({ _id: id })
        
        res.json({'message': 'blog deleted'})
    } catch (error) {
        res.status(500).json({ "message": String(error) })
    }
})


module.exports = router