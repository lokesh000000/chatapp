import userModel from "../Models/userModel.js";

export const user = async (req,res) => {
try {
    
    const currentuserId =  req.currentuser._id;
    console.log(currentuserId);
    const filterusers = await userModel.find({_id : {$ne : currentuserId}}).select("-password")
    res.status(200).json(filterusers);
    console.log(filterusers);

   
    
} catch (error) {
    res.status(400).json({error:"internal server error"})
}
 
}