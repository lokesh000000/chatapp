import bcrypt from "bcrypt";

import userModel from "../Models/userModel.js";
import genetratetokeandsetcookie from "../utils/Jwttoke.js";

export const signup = async (req, res) => {
    const { fullname, username, password, confirmpassword, gender } = req.body;
    console.log("Received signup request:", req.body);
    
    try {
        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        console.log(existingUser)

        const boypc = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlpc = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const salt = await bcrypt.genSalt(10);
        const hashedpassword =  await bcrypt.hash(password ,salt)

        const newuser = new userModel({
            fullname,
            username,
            password : hashedpassword,
            gender,
            profilepic: gender === "male" ? boypc : girlpc
        });

        console.log("Saving new user:", newuser);
        if(newuser){
        genetratetokeandsetcookie(newuser._id ,res);
        const result = await newuser.save();
        console.log("User saved successfully:", result);

        res.status(200).json({
            id: newuser._id,
            fullname: newuser.fullname,
            username : newuser.username,
            profilepic: newuser.profilepic
        });
    }else{
        res.status(400).json({error : "invalid user data"})
    }

    } catch (error) {
        console.error("Error saving user:", error);
        if (error.code === 11000) {
            // Handle duplicate key error
            return res.status(400).json({ error: "User already exist" });
        }
        res.status(500).json({ error: "Server error" });
    }
};

export const login = async (req, res) => {
   
   try{
    console.log("ok")

    const {username ,password} = req.body;
    const user = await userModel.findOne({username});
    const correctpassword = await bcrypt.compare(password , user?.password || "" );
    if(!user || !correctpassword){
      return  res.status(400).json({error : "incorrect username or password"})
    }
    
    console.log(user)
    
    genetratetokeandsetcookie(user._id, res);

    res.status(200).json({
        id : user._id,
        fullname: user.fullname,
        username : user.username,
        profilepic: user.profilepic
    })

   }

   catch (error) {
  console.error("Error logging user:", error);
  res.status(500).json({ error: "Server error" });}
};

export const logout = (req, res) => {
    try{

        res.cookie("jwt" , "" ,{
            maxAge : 0
        })
        console.log("loggedout")
        res.status(200).json({message : "success"})
    }
    catch (error) {
        console.error("Error logout user:", error);
        res.status(500).json({ error: "Server error" });}
};
