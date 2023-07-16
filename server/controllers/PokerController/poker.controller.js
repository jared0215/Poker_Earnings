const { Poker } = require("../../models/Poker/poker.model");
const { User } = require("../../models/User/user.model"); // Add this line

// CREATE
module.exports.createPoker = (req, res) => {
    const pokerGame = new Poker({
        user: req.body.user,
        result: req.body.result,
        amount: req.body.amount,
        location: req.body.location,
        date: req.body.date,
    });

    pokerGame
        .save()
        .then((newPokerGame) => {
            console.log("New poker game:", newPokerGame);

            return User.updateOne(
                { _id: newPokerGame.user },
                { $push: { pokerGames: newPokerGame._id } }
            ).then((updateResult) => {
                console.log("User update result:", updateResult);

                // Send back the new poker game
                res.json(newPokerGame);
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
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
    Poker.findByIdAndRemove(req.params.id)
        .then((deletedPoker) => res.json(deletedPoker))
        .catch((err) =>
            res.json({ message: "Something went wrong", error: err })
        );
};

// Delete All Poker Games
module.exports.deleteAllPokerGames = (req, res) => {
    Poker.deleteMany()
        .then((deleteResult) => {
            // Also delete all poker games from user document
            return User.updateMany({}, { $set: { pokerGames: [] } }).then(
                () => deleteResult
            ); // pass deleteResult to the next then block
        })
        .then((deleteResult) => res.json(deleteResult))
        .catch((err) =>
            res.json({ message: "Something went wrong", error: err })
        );
};
