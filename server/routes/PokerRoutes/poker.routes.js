// Import the Poker controller
const PokerController = require("../../controllers/PokerController/poker.controller.js");

// Export a function that takes the Express application instance
module.exports = (app) => {
    // Define a GET route for retrieving all poker games
    app.get("/api/poker", PokerController.getAllPokers);

    // Define a POST route for creating a new poker game
    app.post("/api/poker", PokerController.createPoker);

    // Define a GET route for retrieving a poker game by ID
    app.get("/api/poker/:id", PokerController.getOnePoker);

    // Define a PUT route for updating a poker game by ID
    app.put("/api/poker/:id", PokerController.updatePoker);

    // Define a DELETE route for deleting a poker game by ID
    app.delete("/api/poker/:id", PokerController.deletePoker);

    // Define a DELETE route for deleting all poker games
    app.delete("/api/poker", PokerController.deleteAllPokerGames);
};
