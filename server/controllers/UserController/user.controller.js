const { User } = require("../../models/User/user.model");
const { Poker } = require("../../models/Poker/poker.model");

// CREATE
module.exports.createUser = (req, res) => {
    User.findOne({ email: req.body.email }) // Check if the email already exists
        .then((existingUser) => {
            if (existingUser) {
                // If email already exists, return an error
                return res.status(400).json({
                    errors: {
                        email: {
                            message: "Email already exists",
                        },
                    },
                });
            }
            // If email is unique, create the user
            return User.create(req.body)
                .then((newUser) => res.json(newUser))
                .catch((err) => res.status(400).json(err));
        })
        .catch((err) => res.status(400).json(err));
};

// READ ALL
module.exports.getAllUsers = (req, res) => {
    User.find()
        .then((allUsers) => res.json(allUsers))
        .catch((err) =>
            res.json({ message: "Something went wrong", error: err })
        );
};

// READ ONE
module.exports.getOneUser = (req, res) => {
    User.findById(req.params.id)
        .then((oneUser) => res.json(oneUser))
        .catch((err) =>
            res.json({ message: "Something went wrong", error: err })
        );
};

// UPDATE
module.exports.updateUser = (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: "No user found with this ID",
                    error: "Not found",
                });
            }

            // Update only the allowed fields
            user.firstName = req.body.firstName || user.firstName;
            user.lastName = req.body.lastName || user.lastName;
            user.email = req.body.email || user.email;

            // Save the updated user
            return user
                .save()
                .then((updatedUser) => res.json(updatedUser))
                .catch((err) => res.status(400).json(err));
        })
        .catch((err) => res.status(400).json(err));
};

// DELETE
module.exports.deleteUser = (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: "No user found with this ID",
                    error: "Not found",
                });
            }
            return Poker.deleteMany({ _id: { $in: user.pokerGames } })
                .then(() => {
                    return user;
                })
                .catch((err) =>
                    res.status(400).json({
                        message: "Failed to delete associated poker games",
                        error: err,
                    })
                );
        })
        .then((user) => {
            if (user) {
                return User.findByIdAndDelete(user._id);
            }
        })
        .then((deletedUser) => {
            if (deletedUser) {
                res.json(deletedUser);
            }
        })
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Something went wrong", error: err })
        );
    console.log("deleteUser");
    console.log(req.params.id);
};

// Get Users Poker Games
module.exports.getUsersPokerGames = (req, res) => {
    User.findById(req.params.id)
        .populate("pokerGames")
        .then((user) => res.json(user.pokerGames))
        .catch((err) =>
            res.json({ message: "Something went wrong", error: err })
        );
};

// Get one poker game of a user
module.exports.getOnePokerGame = (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            let pokerGame = user.pokerGames.id(req.params.gameId);
            res.json(pokerGame);
        })
        .catch((err) =>
            res.json({ message: "Something went wrong", error: err })
        );
};
