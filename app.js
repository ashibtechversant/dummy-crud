const express = require("express");
const app = express();

const users = require("./dummy-data.js");

const HOSTNAME = "127.0.0.1";
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());

//Home get request
app.get("/", (req, res) => {
  res.send(`Welcome to the User API!<br>Please use /users for
    accessing user data.`);
});
//Get all users
app.get("/users", (req, res) => {
  //Send back the list of users
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(users);
});

app.listen(PORT, () => console.log("The server is running in " + PORT));
