import jwt from "jsonwebtoken";
import userModel from "../Models/userModel.js";

const protection = async (req,res,next)=>{

    try{
            const token =  req.cookies.jwt;
            if (!token) {
               return res.status(500).json({error : "unauthorized -no login token"})
            }
            console.log(token)
            const decoded = jwt.verify(token, process.env.Jwt_Token);

            if(!decoded){
               return res.status(500).json({error : " unauthorized invaliid token" })
            }
                console.log(decoded)

             const currentuser = await userModel.findById(decoded.userId).select("-password")

             if(!currentuser){
               return res.status(500).json({error : "user not found"})
             }

             console.log(currentuser)

             req.currentuser = currentuser;
             console.log(req.currentuser)
             next();

    }catch(error){

        res.status(400).json({error : "internal protect error"})
    }
}
export default protection 