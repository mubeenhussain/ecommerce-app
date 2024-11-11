import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModal from '../models/userModal.js';
import  JWT  from 'jsonwebtoken';

export const registerController =async (req,res) => {
    try {
        const {name, email, password, phone, address,answer} = req.body;
        if(!name){
            return res.send({error:"Name is required"});
        }
        if(!email){
            return res.send({error:"email is required"});
        }
        if(!password){
            return res.send({error:"password is required"});
        }
        if(!phone){
            return res.send({error:"phone is required"});
        }
        if(!address){
            return res.send({error:"address is required"});
        }
        if(!answer){
            return res.send({error:"answer is required"});
        }
        // check existing user
        const existingUser = await userModal.findOne({email});
        if(existingUser){
            console.log('this block working')
            return res.status(200).send({
                success: true,
                message: "Already Register, Please Login"
            })
        }
        //for register user password must be hashed for security
        const hashedPassword = await hashPassword(password);
        //save user
        const user = await new userModal({name,email,phone,address,password:hashedPassword,answer});
        user.save();
        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Registration",
            error
        })
    }
}

//post LOGIN
export const loginController = async (req,res) => {
    try {
        const {email,password} = req.body;
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid Email or Password"
            })
        }
        const user = await userModal.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registered"
            })
        }
        const match = await comparePassword(password,user['password']);
        if(!match){
            return res.status(404).send({
                success:false,
                message:"Invalid Password"
            })
        }
        const token = await JWT.sign(
            {_id: user._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        ); //here token generated
        res.status(200).send({
            success:true,
            message:'Login Successfully',
            user:{
                name: user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Login",
            error
        })
    }
}

//testController
export const testController = (req,res) => {
    res.send('protected routes')
}

//forgotpassword controller
export const forgotPasswordController = async (req,res) => {
    try {
        const {email,answer,newPassword} = req.body;
        if(!email){
            res.status(400).send({
                message:"Email is required!"
            })
        }
        else if(!answer){
            res.status(400).send({
                message:"answer is required!"
            })
        }
        if(!newPassword){
            res.status(400).send({
                message:"New Password is required!"
            })
        }
        //check
        const user = await userModal.findOne({email,answer});
        //validation check for user
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Wrong Email or Answer"
            })
        }
        if(user){
            const hashed = await hashPassword(newPassword);
            await userModal.findByIdAndUpdate(user._id,
                {
                    password: hashed
                }
            )
            res.status(200).send({
                success:true,
                message:"Password Reset Successfully"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Something went wrong!",
            error
        })
    }
}