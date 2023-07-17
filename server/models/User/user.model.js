// Import the mongoose module to interact with MongoDB.
const mongoose = require("mongoose");

// Define the UserSchema.
// This defines the structure of documents that will be stored in the "User" collection.
const UserSchema = new mongoose.Schema(
    {
        // Define firstName field: it's a required string with a minimum length of 3 characters.
        firstName: {
            type: String,
            required: [true, "First name is required"],
            minlength: [
                3,
                "First name should have a minimum length of 3 characters",
            ],
        },
        // Define lastName field: it's a required string with a minimum length of 3 characters.
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            minlength: [
                3,
                "Last name should have a minimum length of 3 characters",
            ],
        },
        // Define email field: it's a required unique string.
        // It must match a basic email regex pattern and have a minimum length of 3 characters.
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email already exists"],
            match: [/\S+@\S+\.\S+/, "Email is invalid"],
            minlength: [
                3,
                "Email should have a minimum length of 3 characters",
            ],
        },
        // Define pokerGames field: an array of ObjectIds referencing the "Poker" collection.
        pokerGames: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poker" }],
    },
    {
        // Include timestamps in the schema (createdAt, updatedAt).
        timestamps: true,
    }
);

// Export the User model based on UserSchema.
// This allows other parts of the app to interact with the "User" collection through this model.
exports.User = mongoose.model("User", UserSchema);
