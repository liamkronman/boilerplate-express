var express = require('express');
var bodyParser = require('body-parser');
var app = express();

console.log("Hello World");

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.get("/", function(req, res) {
  absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

app.use(function middleware(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", function(req, res) {
  const response = process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json";
  res.json({"message": response});
});

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.send({
    time: req.time
  });
});

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({echo: word});
});

app.get("/name", (req, res) => {
  const firstName = req.query.first;
  const lastName = req.query.last;

  res.json({ name: `${firstName} ${lastName}` });
});

app.post("/name", (req, res) => {
  var string = req.body.first + " " + req.body.last;
  res.json({name: string});
});























 module.exports = app;
