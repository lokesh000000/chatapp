import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    fullname : {type : String , required : true , minlength : 3 , maxlength:30},
    username : {type : String , required : true , minlength : 3 , maxlength:200 , unique :true},
    password : {type : String , required :  true , minlength : 3 , maxlength:1024 },
    gender : {type : String , required : true , enum : ["male","female"]},
    profilepic : {type : String , default : ""}

}
);


const userModel = mongoose.model("user", userSchema);
export default userModel