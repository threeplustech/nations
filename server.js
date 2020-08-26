const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 3000
const bodyParser = require('body-parser');
const path = require('path');
const nations = require("./nations");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
nations.setJson(path.join(__dirname,"/nations.json"));
console.log(path.join(__dirname,"/nations.json"));

app.get("/", (req, res, next)=>{
  res.send("Welcome to the nations archive.");
})

app.get("/getCountries", (req, res, next)=>{
  var countries = nations.getCountries();
  if(countries){
    res.json({status: 200, data: {countries: countries}, message: "Countries fetched successfully"});
  } else {
    res.json({status: 240, data: null, message: "Server error. Please contact admin."});
  }
  
})

app.get("/getStatesForCountry/:country", (req, res, next)=>{
  var states = nations.getStatesForCountry(req.params.country);
  if(states){
    res.json({status: 200, data: {states: states}, message: "States fetched successfully"});
  } else {
    res.json({status: 400, data: null, message: "Could not get states for this country"});
  }
})

app.get("/getCitiesForState/:country/:state", (req, res, next)=>{
  var cities = nations.getCityForState(req.params.country, req.params.state);
  if(cities){
    res.json({status: 200, data: {cities: cities}, message: "Cities fetched successfully"});
  } else {
    res.json({status: 400, data: null, message: "Could not get cities for this state"});
  }
})


app.listen(port, () => {
  console.log(`Nations app listening at http://localhost:3000`)
})


