// Import the User controller
const UserController = require("../../controllers/UserController/user.controller.js");

// Export a function that takes the Express application instance
module.exports = (app) => {
    // Define a GET route for retrieving all users
    app.get("/api/users", UserController.getAllUsers);

    // Define a POST route for creating a new user
    app.post("/api/users", UserController.createUser);

    // Define a GET route for retrieving a user by ID
    app.get("/api/users/:id", UserController.getOneUser);

    // Define a PUT route for updating a user by ID
    app.put("/api/users/:id", UserController.updateUser);

    // Define a DELETE route for deleting a user by ID
    app.delete("/api/users/:id", UserController.deleteUser);

    // Define a GET route for retrieving all poker games of a user by user's ID
    app.get("/api/users/:id/poker/games", UserController.getUsersPokerGames);

    // Define a GET route for retrieving a specific poker game of a user by user's ID and game's ID
    app.get(
        "/api/users/:id/poker/games/:gameId",
        UserController.getOnePokerGame
    );
};
