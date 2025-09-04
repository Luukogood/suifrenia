// controllers/collectionController.js
const Collection = require('../models/collections');

exports.getCollections = async (req, res) => {
  try {
    const collections = await Collection.find().populate('cards');
    res.json(collections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCollection = async (req, res) => {
  const collection = new Collection({
    userId: req.body.userId,
    cards: req.body.cards,
  });

  try {
    const newCollection = await collection.save();
    res.status(201).json(newCollection);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// // Function to update food value
// const updateFoodValue = async () => {
//     try {
//         const collections = await Collection.find();
//         collections.forEach(async (collection) => {
//             collection.food += 100;
//             await collection.save();
//         });
//         console.log('Food values updated successfully');
//     } catch (err) {
//         console.error('Error updating food values:', err);
//     }
// };

// // Schedule the updateFoodValue function to run at midnight
// cron.schedule('0 0 * * *', () => {
//     console.log('Running the scheduled task to update food values at midnight');
//     updateFoodValue();
// });