const express = require("express");
const router = express.Router();

const users = require("../dummy-data");
router
  .route("/")
  .get((req, res) => {
    res.status(200).json(users);
  })
  .post((req, res) => {
    const { name, skill, email } = req.body;
    if (!name || !skill || !email)
      return res
        .status(400)
        .json({ error: "Name, skill and/or email is missing" });
    users.push({
      id: users.length + 1,
      name,
      skill,
      email,
    });
    res.status(201).json(users[users.length - 1]);
  })
  .all((req, res) => {
    res.status(405).json({ error: "Method not allowed on this endpoint." });
  });

router
  .route("/:id")
  .get((req, res) => {
    const userId = req.params.id;
    const user = users.find((user) => user.id === parseInt(userId));
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  })
  .put((req, res) => {
    const userId = req.params.id;
    const userIndex = users.findIndex((user) => user.id === parseInt(userId));
    if (userIndex == -1)
      return res.status(404).json({ error: "User not found" });
    const { name, skill, email } = req.body;
    if (!name || !skill || !email)
      return res
        .status(400)
        .json({ error: "Name, skill and/or email is missing" });
    users[userIndex].name = name;
    users[userIndex].skill = skill;
    users[userIndex].email = email;
    res.status(200).json(users[userIndex]);
  })
  .delete((req, res) => {
    const userId = req.params.id;
    const userIndex = users.findIndex((user) => user.id === parseInt(userId));
    if (userIndex == -1)
      return res.status(404).json({ error: "User not found" });
    users.splice(userIndex, 1);
    return res.status(204).end();
  });

module.exports = router;
