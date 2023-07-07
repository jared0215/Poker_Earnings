const UserController = require("../../controllers/UserController/user.controller.js");

// Routes for CRUD operations on User
module.exports = (app) => {
    app.get("/api/users", UserController.getAllUsers);
    app.post("/api/users", UserController.createUser);
    app.get("/api/users/:id", UserController.getOneUser);
    app.put("/api/users/:id", UserController.updateUser);
    app.delete("/api/users/:id", UserController.deleteUser);

    app.get("/api/users/:id/poker", UserController.getUsersPokerGames);
};
