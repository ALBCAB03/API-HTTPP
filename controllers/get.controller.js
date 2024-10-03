const Post = require ('../models/post.model');


module.exports.usersconsults = async(req, res) => {
    const userPos = req.query.page;
    const userBadg = req.query.badges;
    const userPriv = req.query.user;

    if (!userPos && !userBadg && !userPriv){
        await Post.find ()
            .then((posts)=> {
                res.status(200).json(posts);
            })
            .catch((error)=>{
                res.status(400).json(error);
            });
    } else if (userPos && !userBadg && !userPriv){
        const Userslength = await Post.countDocuments()
        const lima = (2*(userPos-1));
        const limb = (2*(userPos-1)+1);
        const users = await Post.find();
        
        if (0 <= lima && limb <= Userslength) {
            const PagUser = [users[lima], users[limb]];
;           res.status(200).json(PagUser);
        }else {
            res.status(400).json("No valido")
        };
        
    } else if (!userPos && userBadg && !userPriv){
        const usersBadg = await Post.find({badges :{$in : userBadg}}).select('name');
        res.status(200).json(usersBadg);
    } else if (!userPos && !userBadg && userPriv){
        const consultUser =await Post.find({privileges:'user'}).select('name');
        res.status(200).json(consultUser);
    } else{
        res.status(400).json("No valido")
    }
};

module.exports.userinfo = async(req, res) =>{
    userparam = req.params.parametro;
    if  (userparam === "oldest") {
        const oldestUser = await Post.findOne().sort({ age: -1 }).exec();
        res.status(200).json(oldestUser);
    } else {
        const consultUser =await Post.find({name:userparam}).exec();
        res.status(200).json(consultUser);
    }
};