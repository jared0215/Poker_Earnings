const { Poker } = require("../../models/Poker/poker.model");
const { User } = require("../../models/User/user.model"); // Add this line

// CREATE
module.exports.createPoker = (req, res) => {
    const pokerGame = new Poker({
        user: req.body.user, // Assuming that user is being sent in request body
        result: req.body.result,
        amount: req.body.amount,
        location: req.body.location,
        date: req.body.date,
    });

    pokerGame
        .save()
        .then((newPokerGame) => {
            // Also update the user document with this new poker game
            return User.updateOne(
                { _id: newPokerGame.user },
                { $push: { pokerGames: newPokerGame._id } }
            ).then(() => newPokerGame); // pass newPokerGame to the next then block
        })
        .then((newPokerGame) => res.json(newPokerGame))
        .catch((err) =>
            res.json({ message: "Something went wrong", error: err })
        );
};

// READ ALL
module.exports.getAllPokers = (req, res) => {
    Poker.find()
        .populate("user") // Populate user field
        .then((allPokers) => res.json(allPokers))
        .catch((err) =>
            res.json({ message: "Something went wrong", error: err })
        );
};

// READ ONE
module.exports.getOnePoker = (req, res) => {
    Poker.findById(req.params.id)
        .populate("user") // Populate user field
        .then((onePoker) => res.json(onePoker))
        .catch((err) =>
            res.json({ message: "Something went wrong", error: err })
        );
};

// UPDATE
module.exports.updatePoker = (req, res) => {
    Poker.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((updatedPoker) => res.json(updatedPoker))
        .catch((err) =>
            res.json({ message: "Something went wrong", error: err })
        );
};

// DELETE
module.exports.deletePoker = (req, res) => {
    Poker.findByIdAndDelete(req.params.id)
        .then((deletedPoker) => {
            // Also update the user document to remove this poker game
            return User.updateOne(
                { _id: deletedPoker.user },
                { $pull: { pokerGames: deletedPoker._id } }
            ).then(() => deletedPoker); // pass deletedPoker to the next then block
        })
        .then((deletedPoker) => res.json(deletedPoker))
        .catch((err) =>
            res.json({ message: "Something went wrong", error: err })
        );
};
