//Initialisation
var express = require("express");
var app = express();
var path = require("path");

//Initialize port
app.set("port", process.env.PORT || 8080);

//Initialize folder
app.use(express.static(path.join(__dirname, "public")));

//Start the site
app.get("/", function (req, res) {
  res.type("text/html");
  res.sendFile(__dirname + "/public/index.html");
});

//Run the whole thing on port 8080
app.listen(app.get("port"), function () {
  console.log("Express started on http://localhost:" + app.get("port"));
});

// Copyright@Sergey Germanov
