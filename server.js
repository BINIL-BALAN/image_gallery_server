const express = require("express")
const { PORT, IP } = require("./constant")
const app = express()
const cors = require("cors")
const multer = require('multer');
const bodyParser = require('body-parser');
const { registartion, login } = require("./services/authentication");
const { saveImage, fetchImages } = require("./services/fileOperations");
app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/files",express.static("./public"))

app.post("/register",(req,res)=>{
    registartion(req.body).then((result)=>{
       res.status(result.status).json(result)
    }).catch(()=>{
        res.status(500).json({status:500,message:"Server not respond"})
    })  
})

app.post("/login",(req,res)=>{
    login(req.body).then((result)=>{
       res.status(result.status).json(result)
    }).catch(()=>{
        res.status(500).json({status:500,message:"Server not respond"})
    })  
})

const storage = multer.diskStorage({
    destination: 'public/',
    filename: function(req, file, cb) {
        const fileName = req.body.fileName || file.originalname;
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single('file'),(req, res) => {
     try {
        const imageUrl = `http://${IP}:${PORT}/files/${req.file.filename}`
        const {email} = req.body
        saveImage({email,imageUrl}).then((result)=>{
            res.status(result.status).json(result)
        }).catch(()=>{
            res.status(400).json({message:"Something went wrong"})
        })
     } catch (error) {
        res.status(500).json({message:"Internal server error"})
     }
});


app.post("/imagelist",(req,res)=>{
    console.log(req.body.email);
   try {
    fetchImages(req.body.email).then((result)=>{
        res.status(result.status).json(result)
     }).catch(()=>{
        res.status(400).json({data:[],message:"Somehing went wrong"})
     })
   } catch (error) {
    res.status(500).json({data:[],message:"Internal server error"})
   }
})

app.listen(PORT,IP,()=>{
   console.log(`server starts at http://192.168.1.37:${PORT}`);
})