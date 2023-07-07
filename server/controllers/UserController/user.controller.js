const { User } = require("../../models/User/user.model");
const { Poker } = require("../../models/Poker/poker.model");

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
    User.findById(req.params.id)
        .then((user) => {
            if (!user) {
                return res
                    .status(404)
                    .json({
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
