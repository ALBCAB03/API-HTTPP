const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    name :{
        type: String,
        require: true,
    },
    age :{
        type: Number,
        require: true,
    },
    phone :{
        personal : {
            type : String,
            require : false,
        },
        work : {
            type : String,
            require : false,
        },
        ext : {
            type : String,
            require : false,
        },
    },
    privileges :{
        type : String,
        require : true,
    },
    favorites :{
        artist :{
            type : String,
            require : false,
        },
        food :{
            type : String,
            require : false,
        },
    },
    finished :{
        type : [Number],
        require : false,
    },
    badges :{
        type: [String],
        require: true,
    },
    points : {
        points :{
            type: Number,
            require: false,
        },
        bonus :{
            type: Number,
            require: false,
        },
    }


},
{
    timestamps : true,
    toJSON :{
        transform: (doc, ret) =>{
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret

        },
    },
}
);
module.exports = mongoose.model("Post", postSchema);