const authModel = require("../model/authmodel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../model/authmodel");
require("dotenv").config();
const registerAPI = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password || !role)
        {
            return res.status(401).json({success:false,message:"user data required"})
        }
       const  emailExists = await authModel.findOne({email});
        if (emailExists) {
                        return res
                          .status(401)
                          .json({
                            success: false,
                            message: "user email already exists ",
                          });

        }
               
//encrypted password generate
        const passwordhash = await bcrypt.hash(password, 10);
        //gayu@123  =>ayay
        //naren@123=>jaja
        const newuser = await authModel.create({ username, email, password:passwordhash,role });
        return res.status(200).json({sucess:true,message:"user register succesful",newuser})
    }
    catch (err)
    {
        return res.status(500).json({success:false,message:"user registration failed"})
    }
}

const loginApi = async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailExists = await authModel.findOne({ email });

        if (!emailExists) {
             return res.status(401).json({
               success: false,
               message: "incorrect email or password",
             });
        }
            //  const user = await authModel.find(data=>data.email==email ||data.password==password);

        const passwordCheck = await bcrypt.compare(
          password,
          emailExists.password,
        );
        if (!passwordCheck) {
             return res.status(401).json({
               success: false,
               message: "incorrect email and  password",
             });
        }
//user data load,secretkey,expireIn
        const token = jwt.sign(
          {
            userid: emailExists._id,
            username: emailExists.username,
            email: emailExists.email,
            password: emailExists.password,
            role: emailExists.role,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "24hr",
          },
        );

        return res.status(200).json({success:true,message:"user login successfully",token})
    }
    catch (err)
    {
        return res.status(500).json({success:false,message:"user login failed"})
    }
}
module.exports = { registerAPI,loginApi };