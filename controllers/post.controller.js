const Post = require ('../models/post.model');

module.exports.newUser = (req, res) => {
    //const newuser = new Post({
     //   name : req.body.name,
     //   age : req.body.age,
      //  privileges : req.body.privileges,
       // badges : req.body.badges
    //});
   // res.status(201).json(newuser)
   Post.create(req.body)
    .then((post)=>{
        res.status(201).json(post);
    })
    .catch((error)=>{
        res.status(404).json(error);
    });
};