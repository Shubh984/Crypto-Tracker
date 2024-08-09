const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
const userRoutes = require('./routes/userRoutes');
require('./config/passport')(passport);

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

app.use('/api/user', userRoutes);

app.get('/api/cryptocurrencies', async (req, res) => {
  try {
    console.log('Fetching data from CoinMarketCap API...');

    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY
      }
    });

    console.log('Fetched data from CoinMarketCap API:', response.data); // Debugging log

    const dataWithImages = response.data.data.map(crypto => {
      return {
        ...crypto,
        image: `https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`
      };
    });

    res.json(dataWithImages);
  } catch (error) {
    console.error('Error fetching data from CoinMarketCap API:', error.message); // Detailed error logging
    res.status(500).json({ error: 'Failed to fetch data from CoinMarketCap API' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
