const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
require('dotenv').config()
const ejs = require("ejs");
const constants = require("./config");
const request = require("request");
const { json } = require("body-parser");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

//secret key/payments
const apiKey = process.env.SECRET_KEY;
const baseUrl = constants.openWeatherMap.BASE_URL;
const iconUrl= "http://openweathermap.org/img/wn/"

//weather function


app.get("/", function(req, res){
res.render("home")

});
app.post("/", (req,res)=>{
    let cityName = req.body.cityName;
    // console.log(cityName);
    // res.render("weather", {
    //     cityName,
    // })
    let url = baseUrl + cityName + '&appid=' + apiKey;
    request(url,{json:true},function(err,response,body){
        if(err){
            console.log(err)
        }
        else{
            let iconCode = body.weather[0].icon
            iconImg= iconUrl + iconCode + "@2x.png";
            res.render("home",{
                description: body.weather[0].description,
                icon: iconImg,
                resultingCityName: body.name,
                temperature: (body.main.temp -273.15).toFixed(2)+" °C",
            })
            
        }
    })
})



app.listen(3000, function(){
    console.log("Server is running on port 3000."); 
});