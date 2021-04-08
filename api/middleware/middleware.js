const User = require('../users/users-model')
//const Post = require('../posts/posts-model')


function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log( req.method, req.originalUrl, Date())
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const id = req.params.id
  try{
    const user = await User.getById(id)

    if(!user){
      res.status(404).json(`User with id: ${id} does not exist`)
    }

    else{
      req.user = user
      next()
    }
    
  }
  catch(err){
    res.status(500).json({message:err.message})
  }
  
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.name){
    res.status(400).json({ message: "missing required name field" })
  }
  else{
    next()
  }
}

 function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.text){
    res.status(400).json({ message: "missing required text field" })
  }
  else{
    next()
  }
}

// do not forget to expose these functions to other modules

module.exports = {logger,validateUserId,validateUser,validatePost}
