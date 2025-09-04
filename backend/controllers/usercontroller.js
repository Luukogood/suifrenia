// controllers/userController.js
const User = require('../models/user');

exports.getUsers = async (req, res) => {
  try {
    let users = await User.find();
    // return users who have at least 3 cards ready in battle deck
    users = users.filter((user) => user.battleDeck.length >= 3);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { name, email, imageUrl, walletAddress } = req.body;
    if (email) {
      // zklogin approach
      let existingUser = await User.findOne({ email });
      if (!existingUser) {
        const user = new User({
          name,
          email,
          imageUrl,
          walletAddress,
        });
        const newUser = await user.save();
        res.status(201).json(newUser);
      } else {
        if (Date.now() - Number.parseInt(existingUser.lastLogin) > 86400000) {
          existingUser.foodCoin += 100;
        }
        existingUser.lastLogin = Date.now();
        await existingUser.save();
        res.status(200).send(existingUser);
      }
    } else {
      const existingUser = await User.findOne({ walletAddress });
      if (!existingUser) { // sui wallet login 
        const user = new User({
          walletAddress,
        });
        const newUser = await user.save();
        res.status(201).json(newUser);
      } else {
        if (Date.now() - Number.parseInt(existingUser.lastLogin) > 86400000) {
          existingUser.foodCoin += 100;
        }
        existingUser.lastLogin = Date.now();
        await existingUser.save();
        res.status(200).send(existingUser);
      }
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateWalletAddress = async (req, res) => {
  try {
    const { walletAddress, user_id } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { _id: user_id },
      { walletAddress }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addToBattleDeck = async (req, res) => {
  try {
    const { card, user_id } = req.body;
    const user = await User.findById(user_id);
    if (user.battleDeck.length >= 3) {
      return res
        .status(400)
        .json({ error: 'Battle deck can have max 3 cards.' });
    }
    if (!user.battleDeck.includes(card)) {
      user.battleDeck.push(card);
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } else {
      return res
        .status(400)
        .json({ error: ' Card is already added to battle deck' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBattleDeck = async (req, res) => {
  try {
    const { user_id } = req.query;
    const user = await User.findById(user_id).populate('battleDeck');
    res.status(200).json({ battleDeck: user.battleDeck });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTokens = async (req, res) => {
  try {
    const { food, coin, user_id } = req.body;
    let user = await User.findById(user_id);
    user.foodCoin = food || user.foodCoin;
    user.gameCoin = coin || user.gameCoin;
    user = await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
