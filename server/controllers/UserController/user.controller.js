// Import models
const { User } = require("../../models/User/user.model");
const { Poker } = require("../../models/Poker/poker.model");

// CREATE user
module.exports.createUser = (req, res) => {
    // Use Mongoose to find one user with the same email as the body of the request
    User.findOne({ email: req.body.email }) // Check if the email already exists
        .then((existingUser) => {
            if (existingUser) {
                // If the email already exists, return an error
                return res.status(400).json({
                    errors: {
                        email: {
                            message: "Email already exists",
                        },
                    },
                });
            }
            // If the email is unique, create the user
            return User.create(req.body)
                .then((newUser) => res.json(newUser)) // Send the newly created user as a response
                .catch((err) => res.status(400).json(err)); // Error handling
        })
        .catch((err) => res.status(400).json(err)); // Error handling
};

// READ ALL users
module.exports.getAllUsers = (req, res) => {
    User.find() // Find all users
        .then((allUsers) => res.json(allUsers)) // Send all users as a response
        .catch(
            (err) => res.json({ message: "Something went wrong", error: err }) // Error handling
        );
};

// READ ONE user
module.exports.getOneUser = (req, res) => {
    User.findById(req.params.id) // Find one user by id
        .then((oneUser) => res.json(oneUser)) // Send the user as a response
        .catch(
            (err) => res.json({ message: "Something went wrong", error: err }) // Error handling
        );
};

// UPDATE user
module.exports.updateUser = (req, res) => {
    User.findById(req.params.id) // Find one user by id
        .then((user) => {
            if (!user) {
                // If no user is found, return an error
                return res.status(404).json({
                    message: "No user found with this ID",
                    error: "Not found",
                });
            }

            // Update the user with the request body
            user.firstName = req.body.firstName || user.firstName;
            user.lastName = req.body.lastName || user.lastName;
            user.email = req.body.email || user.email;

            // Save the updated user
            return user
                .save()
                .then((updatedUser) => res.json(updatedUser)) // Send the updated user as a response
                .catch((err) => res.status(400).json(err)); // Error handling
        })
        .catch((err) => res.status(400).json(err)); // Error handling
};

// DELETE user
module.exports.deleteUser = (req, res) => {
    User.findById(req.params.id) // Find one user by id
        .then((user) => {
            if (!user) {
                // If no user is found, return an error
                return res.status(404).json({
                    message: "No user found with this ID",
                    error: "Not found",
                });
            }
            // If user is found, delete all the associated poker games
            return Poker.deleteMany({ _id: { $in: user.pokerGames } })
                .then(() => {
                    return user;
                })
                .catch(
                    (err) =>
                        res.status(400).json({
                            message: "Failed to delete associated poker games",
                            error: err,
                        }) // Error handling
                );
        })
        .then((user) => {
            if (user) {
                // Delete the user
                return User.findByIdAndDelete(user._id);
            }
        })
        .then((deletedUser) => {
            if (deletedUser) {
                res.json(deletedUser); // Send the deleted user as a response
            }
        })
        .catch(
            (err) =>
                res
                    .status(400)
                    .json({ message: "Something went wrong", error: err }) // Error handling
        );
};

// Get Users Poker Games
module.exports.getUsersPokerGames = (req, res) => {
    User.findById(req.params.id) // Find one user by id
        .populate("pokerGames") // Populate the user's poker games
        .then((user) => res.json(user.pokerGames)) // Send the user's poker games as a response
        .catch(
            (err) => res.json({ message: "Something went wrong", error: err }) // Error handling
        );
};

// Get one poker game of a user
module.exports.getOnePokerGame = (req, res) => {
    User.findById(req.params.id) // Find one user by id
        .then((user) => {
            let pokerGame = user.pokerGames.id(req.params.gameId);
            res.json(pokerGame); // Send the poker game as a response
        })
        .catch(
            (err) => res.json({ message: "Something went wrong", error: err }) // Error handling
        );
};
