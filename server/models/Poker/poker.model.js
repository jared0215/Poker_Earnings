const mongoose = require("mongoose");

const PokerSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        result: { type: String, enum: ["Win", "Loss"], required: true },
        amount: { type: Number, required: true },
        location: { type: String, required: true },
        date: { type: Date, required: true },
    },
    { timestamps: true }
);

module.exports.Poker = mongoose.model("Poker", PokerSchema);
