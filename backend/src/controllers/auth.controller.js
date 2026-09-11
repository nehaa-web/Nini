import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service"

export async function register( req , res) {

    const { username , email , password } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [ {email} , {username} ]
    }) 

    if(isUserAlreadyExist){
        return res.status(400).json({
            message : "User with this email or username already exist",
            success : false ,
            err : "User already exists"
        })
    }

    const  user = await userModel.create({
        username , email , password 
    })

    await sendEmail({
        to: email ,
        subject: "Welcome to Perplexity",
        text: `Hi ${username},\n\nThank you for registering at Perplexity. We are excited to have you on board!\n\nBest regards,\nThe Perplexity Team`,
        html: `<p>Hi ${username},</p>
        <p>Thank you for registering at <strong>Perplexity</strong>. We are excited to have you on board!</p>
        <p>Best regards,<br>The Perplexity Team</p>`
    })

    res.status(201).json({
        message: "User registered succesfully",
        succes: true ,
        user: {
            id: user._id ,
            username: user.username ,
            email : user.email
        }
    })
}