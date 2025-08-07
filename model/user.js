const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

   isverified:{
    type:Boolean,
    default:false
   },

    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:['user','account','admin'],
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
 
})


userSchema.pre('save', async function(next) {
    if(!this.isModified('password'))  return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model("user", userSchema);