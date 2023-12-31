const express = require("express");
const fileUploader = require("express-fileupload")
const generate_ascii_art = require('./ascii_art_generator');
const path = require('path')
const app = express();
const port = process.env.PORT || 3001;
app.use(express.static("."));
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(fileUploader());

app.get("/",(req,res)=>{
    res.render('index',{message:"Image to ascii generator Upload an image",text:""})
})
app.post("/upload",(req,res)=>{
    if(!req.files){
        res.send("Input image")
    }else{
    generate_ascii_art(req.files.file.data).then((resp)=>{
        res.render('index',{message:"Image to ascii generator Upload an image",text:resp})
    })
    }
})

app.listen(port,()=>{
    console.log("process running on port"+ port);
})