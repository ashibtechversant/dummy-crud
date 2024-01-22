const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Home get request
app.get("/", (req, res) => {
  res.send(`Welcome to the User API!<br>Please use /users for
    accessing user data.`);
});

const userRouter = require("./routes/users");
app.use("/users", userRouter);

app.listen(PORT, () => console.log("The server is running in " + PORT));
