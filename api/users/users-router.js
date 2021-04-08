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
  const users = await Users.get()
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

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
