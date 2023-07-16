const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            minlength: [
                3,
                "First name should have a minimum length of 3 characters",
            ],
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            minlength: [
                3,
                "Last name should have a minimum length of 3 characters",
            ],
        },
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
        pokerGames: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poker" }],
    },
    { timestamps: true }
);

exports.User = mongoose.model("User", UserSchema);
