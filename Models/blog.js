const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'Anonymous'
    },
    content: {
        type: String,
        required: true
    },
    pic: {
        type: String, 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Blog', blogSchema)