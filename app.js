const express = require("express");
const date = require(__dirname + "/date.js");

const app = express();

const items = [];
const workItems = [];

app.set("view engine", "ejs");

app.use(express.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  const day = date.getDate();
  res.render("list", {listTitle: day, newListItems: items});
});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post("/work", function(req, res) {
  const work = req.body.newItem;
  workItems.push(work);
  res.redirect("/work");
});

app.post("/", function(req, res) {

  const item = req.body.newItem;

  if(req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server listening on PORT 3000!");
});
