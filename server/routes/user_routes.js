const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
} = require("../db/queries/users");

// create a new user
// http://localhost:8080/users/register
router.post("/register", async (req, res) => {
  // post is used to send data to the server to create a new resource-> it is giving the server information (data)
  try {
    const newUser = await createUser(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Error creating user" });
  }
});

// view all users
// http://localhost:8080/users/
router.get("/", async (req, res) => {
  // get is used to show data to the user from the server
  try {
    const users = await getAllUsers();
    res.status(200).json({ users }); // curly braces because json data can only be sent as an object
  } catch (err) {
    res.status(500).json({ error: "Error getting users" });
  }
});

//edit user
// http://localhost:8080/users/:id
router.put("/:id", async (req, res) => {
  // destructure the request body to get the username and email
  const {username, email} = req.body;
  try {
    // req.params.id will be used to get the user id from the URL and is needed anytime we have :id in the URL
    const editedUser = await updateUser(req.params.id, username, email);
    // this returns the the information (body) of the user that was updated (editedUser) and sends it back to the client as a response (res)
    res.status(200).json(editedUser);
  } catch (err) {
    res.status(500).json({ error: "Error updating user" });
  }
})

// login
// http://localhost:8080/users/login
router.post("/login", async (req, res) => {
  try {
    // Get the user by email
    const user = await getUserByEmail(req.body.email);

    // Check if the user exists and password matches
    if (user && user.password === req.body.password) {
      console.log("LOGGED IN USER INFO :", user);
      res.status(200).json(user); // Return the full user object
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }
});

// logout
// http://localhost:8080/users/logout


module.exports = router;
