const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./db/connection");
const cors = require("cors");
const userRoutes = require("./routes/user_routes");

// Defining the PORT that the server will run on. 
// It first checks for an environment variable called PORT, and if that doesn't exist, it defaults to 8080.
const PORT = process.env.PORT || 8080;

// Creating an instance of an Express application. 
//This app object represents the Express application and is used to configure routes, middleware, etc.
const app = express();

// Using the express.json() middleware to parse incoming requests with JSON payloads. 
// This allows the server to handle data sent in the body of POST requests as JSON.
app.use(express.json());
app.use(bodyParser.json());

// Using the cors() middleware to enable CORS (Cross-Origin Resource Sharing) for all requests.
app.use(cors());

// Middleware that helps process data sent in forms (like when a user submits a form on a website). 
// The { extended: true } option lets you handle more complex data (like objects and arrays) in form submissions, instead of just simple strings.
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Registering the user-related routes under the '/users' path. When any request comes in starting with '/users', the app will use userRoutes to handle the request.
app.use("/users", userRoutes);

// Setting up a basic GET route for the root path ('/'), which sends back a simple welcome message when someone accesses the root of the server.
app.get("/", (req, res) => {
  res.send("WELCOME TO THE SERVER 🚀"); // Sending a response with a welcome message when the server root is accessed.
});

// Starting the server and making it listen on the specified PORT. 
// Once the server is up and running, a message is logged to the console to confirm the server's operational status and the port number it's listening on.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`); // Logging a message indicating the server is live and on which port.
});
