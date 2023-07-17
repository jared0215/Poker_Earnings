// Import models
const { Poker } = require("../../models/Poker/poker.model");
const { User } = require("../../models/User/user.model");

// CREATE poker game
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
            // Log the new game
            console.log("New poker game:", newPokerGame);

            // Update the user document with the new poker game id
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
            res.status(500).json(err); // Error handling
        });
};

// READ ALL poker games
module.exports.getAllPokers = (req, res) => {
    Poker.find()
        .populate("user") // Populate the user field
        .then((allPokers) => res.json(allPokers)) // Send all poker games as a response
        .catch(
            (err) => res.json({ message: "Something went wrong", error: err }) // Error handling
        );
};

// READ ONE poker game
module.exports.getOnePoker = (req, res) => {
    Poker.findById(req.params.id)
        .populate("user") // Populate the user field
        .then((onePoker) => res.json(onePoker)) // Send the poker game as a response
        .catch(
            (err) => res.json({ message: "Something went wrong", error: err }) // Error handling
        );
};

// UPDATE poker game
module.exports.updatePoker = (req, res) => {
    Poker.findByIdAndUpdate(req.params.id, req.body, { new: true }) // Update the poker game with the request body and return the new poker game
        .then((updatedPoker) => res.json(updatedPoker)) // Send the updated poker game as a response
        .catch(
            (err) => res.json({ message: "Something went wrong", error: err }) // Error handling
        );
};

// DELETE poker game
module.exports.deletePoker = (req, res) => {
    Poker.findByIdAndRemove(req.params.id) // Find the poker game by ID and remove it
        .then((deletedPoker) => {
            if (!deletedPoker) {
                // If no poker game is found, return an error
                return res.status(404).json({
                    message: "No poker game found with this ID",
                    error: "Not found",
                });
            }

            // Remove the deleted poker game ID from the associated user's pokerGames array
            User.findByIdAndUpdate(
                deletedPoker.user,
                { $pull: { pokerGames: deletedPoker._id } },
                { new: true }
            )
                .then((updatedUser) => {
                    if (!updatedUser) {
                        // If the associated user is not found, return an error
                        return res.status(404).json({
                            message: "No user found with this ID",
                            error: "Not found",
                        });
                    }

                    res.json(deletedPoker); // Send the deleted poker game as a response
                })
                .catch((err) =>
                    res.status(500).json({
                        message:
                            "Failed to delete associated poker game from the user",
                        error: err,
                    })
                );
        })
        .catch((err) =>
            res.status(500).json({
                message: "Failed to delete the poker game",
                error: err,
            })
        );
};

// Delete All Poker Games
module.exports.deleteAllPokerGames = (req, res) => {
    Poker.deleteMany() // Delete all poker games
        .then((deleteResult) => {
            // Also delete all poker games from user document
            return User.updateMany({}, { $set: { pokerGames: [] } }).then(
                () => deleteResult
            ); // pass deleteResult to the next then block
        })
        .then((deleteResult) => res.json(deleteResult)) // Send the delete result as a response
        .catch(
            (err) => res.json({ message: "Something went wrong", error: err }) // Error handling
        );
};
