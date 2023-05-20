const express= require("express");
const app= express();
const nodemailer= require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 8000;
app.use(express.static('public'));
app.use(express.json());

app.listen(PORT,()=>{
    console.log('server started');
})


app.post('/api/sendMsg', (req,res)=>{

console.log(req.body);
const transport= nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass: process.env.PASSWORD,
        
    }
})
const mailoptions ={
    to: "elitemohityadav@gmail.com",
    subject: `Message from ${req.body.Name} Email : ${req.body.Email}`,
  text: req.body.Msg,
}
const clientmail ={
    to:req.body.Email,
    subject: "Thanks for contacting Mohit Yadav",
    text: "I have got your message. I will contact you soon."
}
transport.sendMail(mailoptions,(error,info)=>{
    if(error){
        console.log(error);
        res.send('error');
    }
    else{
        console.log('email sent'+info.response);
        res.send('success')
    }
})
transport.sendMail(clientmail);
})