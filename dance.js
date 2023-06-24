const express = require("express");
const path=require("path");
const fs=require("fs");
const mongoose = require('mongoose');
const bodyparser=require('body-parser');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/nabbu');
  console.log("we are connected yippyy!");
}

const dance = express();
const port = 80;


const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const Contact = mongoose.model('DanceWebsite', ContactSchema);

//for serving static files:
dance.use('/static',express.static('static'));
dance.use(express.urlencoded())
//set the template engine as pug:
dance.set('view engine','pug');

//set views directory
dance.set('views',path.join(__dirname,'views'));

//our pug demo endpoint
dance.get("/", (req, res)=>{ 
    const params={}
    res.status(200).render('index',params)
})

dance.get("/contact", (req, res)=>{ 
    const params={}
    res.status(200).render('contact',params)
})

dance.post("/contact", (req, res)=>{ 
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("This Entry has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Entry could not be added to the database")
    })

    // res.status(200).render('contact')
})


dance.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
