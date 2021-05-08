const express=require("express");
const request=require("request");
const https=require("https");
const bodyParser= require("body-parser");
const { json } = require("body-parser");
const { hostname } = require("os");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var firstName= req.body.firstname;
    var lastName=req.body.lastname;
    var email=req.body.mail;
    
    var data={
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);
   var url="https://$API_SERVER.api.mailchimp.com/3.0/lists/5eb6fe27cc";
   const options={
       protocol:"https:",
       host :"us1.api.mailchimp.com",
       path:"/3.0/lists/5eb6fe27cc",
       method:"POST",
       auth:"Himank:0a96dc395fac2a13b161e024c61cbe2f-us1"
   };

     const request=https.request(options,function(response){

        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});

// process.env.PORT is a dynamic port that heroku will define
app.listen(process.env.PORT|| 3000,function(){
    console.log("running");
})


//5eb6fe27cc

// 0a96dc395fac2a13b161e024c61cbe2f-us1