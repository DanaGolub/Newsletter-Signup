const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();


///THIS IS THE CODE THAT WORKS, BUT HAS BEEN DEPRECATED//////

// const request = require("request");
// const https = require("https");

app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
});

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
  auth: "dana1:ee5b58918e545689b21593fcc6a70805-us1"
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


app.post("/failure", function(req, resp) {
  resp.redirect("/")
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server running on port 3000!")
});




//API KEY:
// ee5b58918e545689b21593fcc6a70805-us1

//LIST ID:
// 09a3345210


//
//
// app.use(express.static("Public"));
// app.use(bodyParser.urlencoded({extended: true}));
//
// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/signup.html")
// });
//
// app.post("/", function(req, res) {
//
//   https.get("/", function(response) {
//     console.log(response.statusCode);
//
//     response.on("data", function(data) {
//       const inputData = JSON.parse(data)
//       const clientFirstName = inputData.body.fName;
//       const clientLastName = inputData.body.lName;
//       const clientEmail = inputData.body.email;
//       res.write("<p>clientFirstName</p>");
//       res.write("<h1>clientEmail</h1>");
//       res.send()
//     })
//
//   });
//
// });
