const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const User = require('./users-model')
const Post = require('../posts/posts-model')

// The middleware functions also need to be required
const mw = require('../middleware/middleware')

const router = express.Router();

router.get('/', async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
 try{
  const users = await User.get()
  res.status(200).json(users)
 }
 catch(err){
   res.status(500).json({message:err.message})
 }
  
});

router.get('/:id', mw.validateUserId, async (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  try{
    res.status(200).json(req.user)
  }
  catch(err){
    res.status(500).json({message:err.message})
  }
});

router.post('/', mw.validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert(req.body)
    .then(user =>{
      res.status(200).json(user)
    })
    .catch(err =>{
      console.log(err)
      res.status(500).json(err.message)
    })
});

router.put('/:id', mw.validateUserId, mw.validateUser, async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const update = await User.update(req.params.id, req.body)
  try{
    res.status(200).json(update)
  }
  catch(err){
    res.status(500).json({message:err.message})
  }
  
});

router.delete('/:id', mw.validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const id = req.params.id
  try{
    const remove = await User.remove(id)
    res.status(200).json(remove)
  }
  catch(err){
    res.status(500).json({message:err.message})
  }
});

router.get('/:id/posts', mw.validateUserId, async (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try{
    const posts = await Post.get()
    res.status(200).json(posts)

  }
  catch(err){
    res.status(500).json({message:err.message})
  }

});

router.post('/:id/posts', mw.validateUserId, mw.validatePost, async (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try{
    const post = await Post.insert(req.body)
    res.status(201).json(post)
  }
  catch(err){
    res.status(500).json()
  }

});

// do not forget to export the router

module.exports= router
