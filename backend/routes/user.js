const express =require("express");
const router=express.Router();
const zod=require("zod");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const {authMiddleware}=require("../middleware");
const {User}=require("../db");
require("dotenv").config() 
const JWT_SECRET=process.env.JWT_SECRET
const signupSchema=zod.object({
    username:zod.string().email({ message: "Invalid email address" }),
    password:zod.string().min(6),
    firstName:zod.string().min(1).max(50),
    lastName:zod.string().max(50)
})

const signinSchema=zod.object({
    username:zod.string().email({ message: "Invalid email address" }),
    password:zod.string().min(6)
})

const updateBody=zod.object({
	password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
})

router.post("/signup",async (req,res)=>{
    const body=req.body
    const {success}=signupSchema.safeParse(body);
    if(!success){
        return res.status(400).json({
            message:"Email already taken/Incorrect inputs"
        })
    }
    const userexist=await User.findOne({
        username:body.username
    })
    
    if(userexist){
        return res.status(409).json({
            message:"Email already taken"
        })
    }

    const hashedPassword=await bcrypt.hash(body.password,10)

    const dbuser=await User.create({
        username:body.username,
        password:hashedPassword,
        firstName:body.firstName,
        lastName:body.lastName
    })
    const token = jwt.sign({ userId:dbuser._id }, JWT_SECRET) 

    res.json({
        message:"User created successfully",
        token:token
    })
})

router.post("/signin",async (req,res)=>{
    const body=req.body
    
    const result=signinSchema.safeParse(body);

    if(!result.success){
        return res.status(411).json({
            message:"Invalid inputs"
        })
    }
    const user=await User.findOne({username:body.username});

    if(!user){
        return res.status(404).json({   
            message:"User not found"
        })
    }

    const isPasswordValid=await bcrypt.compare(body.password,user.password)

    if(!isPasswordValid){
        return res.status(401).json({
            message:"Incorrect Password"
        })
    }

    const token=jwt.sign({userId:user._id},JWT_SECRET)
    res.status(200).json({
        message:"Signin successful",
        token:token
    })
})
router.put("/update",authMiddleware,async (req,res)=>{
    const body=req.body;
    const result=updateBody.safeParse(body);
    if(!result.success){
        return res.status(411).json({
            message:"Error while updating information"
        })
    }
    await User.updateOne({_id:req.userId},body);
    res.json({
        message:"Update successfully"
    })

})
module.exports=router