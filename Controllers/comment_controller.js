const router = require('express').Router()
const Comment = require('../models/comment')
const User = require('../models/user')

//INDEX
router.get('/', async (req, res) => {
    try {
        let comments = await Comment.find()
        res.send(comments)
    } catch (error) {
        console.log(error)
        res.status(500).json({ 'message': 'no comment' })
    }
})

//CREATE COMMENT
router.post('/', async (req, res) => {
    try {
        const comment = await new Comment({
            ...req.body
        }).save()
        
        const existingUser = await User.findById(req.body.user)
        existingUser.comments.push(comment._id)
        let updatedUser = await User.findByIdAndUpdate(req.body.user, existingUser)

    
        res.send(comment)
    } catch (error) {
        console.log(error)
        res.status(500).json({ 'message': 'unable to save comment' })
    }
})

module.exports = router