// Importing express to use its features for building server-side web applications
const express = require("express");

// Initialising an express application
const app = express();

// Setting up the port for server to listen
const port = 8000;

// Importing cors for enabling Cross Origin Resource Sharing
const cors = require("cors");

// Using cors middleware for allowing requests from different origins
app.use(cors());

// Using express.json middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Using express.urlencoded middleware to parse incoming requests with URL-encoded payloads.
// Setting 'extended' to 'true' means the middleware can parse arrays and objects; if set to 'false', it can only parse strings
app.use(express.urlencoded({ extended: true }));

// Importing mongoose configuration
// This is where the application connects to the MongoDB database
require("./config/mongoose.config.js");

// Importing and using routes from route files
// The 'app' instance of express is passed as an argument so that the routes can use it to define end-points
require("./routes/UserRoutes/user.routes.js")(app);
require("./routes/PokerRoutes/poker.routes.js")(app);

// Making the express application listen for incoming requests on the defined port
app.listen(port, () => console.log(`Listening on port: ${port}`));
