const { Users } = require("../db/database");

const addUser = ({ username, email, password })=>{
   try {
    const newUser = new Users({username, email, password})
    newUser.save()
    return {status:200,message:"Registartion successfull !"}
   } catch (error) {
    return {status:400,message:"Registartion failed try after some times"}
   }
}

const registartion = async ({ username, email, password }) => {
  try {
    const result = await Users.findOne({ email });
    if (result) {
      return { status: 400, message: "User already exist" };
    }
   return  addUser({ username, email, password })
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Something went wrong" };
  }
};

const login =async ({email,password})=>{
   try {
    const result = await Users.findOne({ email,password });
    if(result){
      return {status:200,message:"Login successfull !"}  
    }else{
     return {status:401,message:"Invalid email or password"}    
    }
   } catch (error) {
     return {status:500,message:"Something went wrong"}
   }
}

module.exports = {
  registartion,
  login
};
