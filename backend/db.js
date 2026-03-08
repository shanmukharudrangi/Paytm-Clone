const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://admin:admin%40123@cluster0.lws1p14.mongodb.net/")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:50
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    lastName:{
        type:String,
        trim:true,
        maxLength:50
    },
});

const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,//Refernce to User model
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});
const User= mongoose.model('User',userSchema);
const Account=mongoose.model('Account',accountSchema);
module.exports={
    User,
    Account
};
