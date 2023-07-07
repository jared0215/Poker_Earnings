const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: [true, "First name is required"] },
        lastName: { type: String, required: [true, "Last name is required"] },
        email: { type: String, required: [true, "Email is required"] },
        pokerGames: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poker" }],
    },
    { timestamps: true }
);

module.exports.User = mongoose.model("User", UserSchema);
