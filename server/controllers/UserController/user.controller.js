const { User } = require("../../models/User/user.model");

// CREATE
module.exports.createUser = (req, res) => {
    User.create(req.body)
        .then((newUser) => res.json(newUser))
        .catch((err) =>
            res.json({ message: "Something went wrong", error: err })
        );
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
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((updatedUser) => res.json(updatedUser))
        .catch((err) =>
            res.json({ message: "Something went wrong", error: err })
        );
};

// DELETE
module.exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id, { new: true })
        .then((deletedUser) => res.json(deletedUser))
        .catch((err) =>
            res.json({ message: "Something went wrong", error: err })
        );
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
