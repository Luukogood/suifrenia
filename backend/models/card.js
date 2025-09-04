const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  name: { type: String, required: true, unique: true },
  power: { type: Number, required: true, default: 0 },
  hp: { type: Number, required: true, default: 0 },
  level: { type: Number, required: true, default: 1 },
  speed: { type: Number, required: true, default: 0 },
  stamina: { type: Number, required: true, default: 0 },
  theme: { type: String, required: true, enum: ['jungle', 'aqua', 'mystic'] },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  baseImgUrl: { type: String, required: true },
  cardImgUrl: { type: String, required: true },
});

module.exports = mongoose.model('Card', cardSchema);
