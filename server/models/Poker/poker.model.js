// Import mongoose to interact with MongoDB.
const mongoose = require("mongoose");

// Define the PokerSchema. This will structure the documents in the "Poker" collection.
const PokerSchema = new mongoose.Schema(
    {
        // Define a user field: It's a required ObjectId that references the "User" collection.
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // Define result field: It's a required string that can only be "Win" or "Loss".
        result: { type: String, enum: ["Win", "Loss"], required: true },
        // Define amount field: It's a required number.
        amount: { type: Number, required: true },
        // Define location field: It's a required string.
        location: { type: String, required: true },
        // Define date field: It's a required date.
        date: { type: Date, required: true },
    },
    {
        // Include timestamps in the schema (createdAt, updatedAt).
        timestamps: true,
    }
);

// Export the Poker model based on PokerSchema.
// This allows other parts of the application to interact with the "Poker" collection through this model.
module.exports.Poker = mongoose.model("Poker", PokerSchema);
