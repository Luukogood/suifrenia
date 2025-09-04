const { Collection } = require('mongoose');
const Card = require('../models/card');

// Get all cards
exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find().populate('user');
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new card
exports.createCard = async (req, res) => {
  const { name, theme, user, cardImgUrl, baseImgUrl } = req.body;

  if (await Card.findOne({ name })) {
    return res.status(400).json({ error: 'Card already exist.' });
  }

  let power = 0,
    hp = 0,
    speed = 0,
    stamina = 0;

  if (theme === 'forest') {
    (power = 100), (hp = 10), (speed = 60), (stamina = 50);
  }
  if (theme === 'aqua') {
    (power = 30), (hp = 50), (speed = 80), (stamina = 100);
  } else {
    (power = 70), (hp = 30), (speed = 50), (stamina = 40);
  }

  const card = new Card({
    name,
    power,
    hp,
    speed,
    stamina,
    theme,
    user,
    cardImgUrl,
    baseImgUrl,
  });

  try {
    const newCard = await card.save();
    res.status(201).json(newCard);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an existing card
exports.updateCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    card.name = req.body.name || card.name;
    card.power = req.body.power || card.power;
    card.hp = req.body.hp || card.hp;
    card.level = req.body.level || card.level;
    card.speed = req.body.speed || card.speed;
    card.stamina = req.body.stamina || card.stamina;
    card.theme = req.body.theme || card.theme;

    const updatedCard = await card.save();

    res.status(200).json(updatedCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getCardCollection = async (req, res) => {
  try {
    const { user_id } = req.query;
    const cardCollection = await Card.find({ user: user_id });
    res.status(200).json(cardCollection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};