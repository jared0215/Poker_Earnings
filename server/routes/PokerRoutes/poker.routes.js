const PokerController = require("../../controllers/PokerController/poker.controller.js");

// Routes for CRUD operations on Poker
module.exports = (app) => {
    app.get("/api/poker", PokerController.getAllPokers);
    app.post("/api/poker", PokerController.createPoker);
    app.get("/api/poker/:id", PokerController.getOnePoker);
    app.put("/api/poker/:id", PokerController.updatePoker);
    app.delete("/api/poker/:id", PokerController.deletePoker);
};
