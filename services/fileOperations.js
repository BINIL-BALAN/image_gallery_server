const { Images } = require("../db/database");

const saveImage = async ({email,imageUrl})=>{
     try {
        const newPost = new Images({email,imageUrl})
        newPost.save()
        return {status:200,message:"Image saved successfully"}
     } catch (error) {
        return {status:200,message:"Image upload failed"}
     }
}

const fetchImages = async (email)=>{
    try {
      const data = await Images.find({email})
      return {status:200,data,message:"Success"}
    } catch (error) {
     return {status:400,message:"Failed to fetch images"}
    }
}

module.exports = {
    saveImage,
    fetchImages
}