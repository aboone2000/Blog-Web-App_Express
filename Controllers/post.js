const router = require('express').Router()
const db = require('../models')

router.get('/', (req, res) => {
  db.post.find()
    .then((posts => {
        res.render('posts/index', {posts})
    }))
    .catch(err => {
        console.log(err)
        res.render('error404')
    })
})

router.post('/', (req, res) => {
    db.post.create(req.body)
        .then(() => {
            res.redirect('/posts')
        })
        .catch(err => {
          if (err && err.name == 'ValidationError') {
            let message = 'Validation Error:'
            for (var field in err.errors) {
              message += `${field} was ${err.errors[field].value}.`
              message += `${err.errors[field].message}`
            }
            console.log('Validation error message', message)
            res.render('posts/new', {message})
          }
          else {
            res.render('error404')
          }
        })
})

router.get('/new', (req, res) => {
  res.render('posts/new')
})

router.get('/:id', (req, res) => {
  db.post.findById(req.params.id)
  .populate('posts')
  .then(post => {
    console.log(post.comments)
    res.render('posts/show', {post})
  })
  .catch(err => {
    console.log('err, err')
    res.render('error404')
  })
})

router.put('/:id', (req, res) => {
  db.Place.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    res.redirect(`/posts/${req.params.id}`)
  })
  .catch(err => {
    console.log('err', err)
    res.render('error404')
  })
})

router.delete('/:id', (req, res) => {
 db.Place.findByIdAndDelete(req.params.id)
 .then(place => {
  res.redirect('/posts')
 })
 .catch(err => {
  console.log('err', err)
  res.render('error404')
 })
})

router.get('/:id/edit', (req, res) => {
  db.Place.findById(req.params.id)
  .then(post => {
    res.render('posts/edit', {post})
  })
  .catch(err => {
    res.render('error404')
  })
})

module.exports = router

