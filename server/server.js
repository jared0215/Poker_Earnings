const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");

app.use(cors());
app.use(express.json()); // Allows JSON Objects to be posted
app.use(express.urlencoded({ extended: true })); // Allows JSON Objects with strings and arrays

// Require mongoose Configuration
require("./config/mongoose.config.js");

// Require routes
require("./routes/author.routes.js")(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));
