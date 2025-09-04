// server.js
const express = require('express');
const connectDB = require('./config/db');
const userRoute = require('./routes/userRoute');
const collectionRoutes = require('./routes/collectionRoutes');
const cardRoutes = require('./routes/cardRoutes');
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use('/uploads', express.static('public/uploads'));

app.use('/api/users', userRoute);
app.use('/api/collections', collectionRoutes);
app.use('/api/cards', cardRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
