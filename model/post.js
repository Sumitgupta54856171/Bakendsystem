const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
	userid:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'user',
		required: true
	},
    title: {
        type: String,
    },
    image:{
	name:{
        type: String,
	},
	path:{
		type:String,
	}
},
see:{
	type:Number,
	default:0,
},
createdAt: {
	type: Date,
	default: Date.now,
},
Comments: [{
	text:{
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
}],
like:[ {
    userlike:{
	type: mongoose.Schema.Types.ObjectId,
	ref: 'user',
}}]

});
module.exports = mongoose.model("post",postSchema)