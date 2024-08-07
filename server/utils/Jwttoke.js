import jwt from "jsonwebtoken"

 
const genetratetokeandsetcookie = (userId , res ) => {
  const token =   jwt.sign({userId}, process.env.Jwt_Token,{
    expiresIn : '15d'
})
res.cookie("jwt" , token , {
    maxAge : 15*24*60*60*1000,
    httpOnly : true,
    sameSite : "strict"
})

}
export default genetratetokeandsetcookie