const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
//package to allow access to .env file, where API keys are stored
require('dotenv').config();


//To serve static files
app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended: true}));


//instructions with a callback function when a get request is created
//// GET method route
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
});

//// POST method route
app.post("/", function(req, res) {

const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;

const data = {
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      }
    }
  ]
};

const jsonData = JSON.stringify(data);


const url = "https://us1.api.mailchimp.com/3.0/lists/09a3345210"

const options = {
  
  method: "POST",
  auth: (process.env.APP_API_KEY)
}



const request = https.request(url, options, function(response) {
  if (response.statusCode === 200) {
    res.sendFile(__dirname + "/success.html")
  } else {
    res.sendFile(__dirname + "/failure.html")
  };
  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();

} );

//if there's a problem with the signup process
app.post("/failure", function(req, resp) {
  resp.redirect("/")
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server running on port 3000!")
});



