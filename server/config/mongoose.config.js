// Import Mongoose
const mongoose = require("mongoose");

// Connect to a MongoDB database named "poker-earnings" at localhost on port 27017
mongoose
    .connect("mongodb://127.0.0.1:27017/poker-earnings", {
        useNewUrlParser: true, // Use the new URL string parser
        useUnifiedTopology: true, // Use the unified topology for MongoDB driver
    })
    .then(() => console.log("Established a connection to the database")) // Connection successfully established
    .catch(
        (err) =>
            console.log(
                "Something went wrong when connecting to the database",
                err
            ) // An error occurred during the connection
    );
