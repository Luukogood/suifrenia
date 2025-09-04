const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
  food: { type: Number, required: true },
});

module.exports = mongoose.model("Collection", collectionSchema);