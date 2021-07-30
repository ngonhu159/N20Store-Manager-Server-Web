var express = require("express");
var app = express();

//post-get
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var server = require("http").Server(app);

app.get("/temperature", function (req, res) {
    res.render("website");
});
  
server.listen(process.env.PORT || 3000, () => {
    console.log("Listening on *: 3000");
});