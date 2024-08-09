import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req = NextApiRequest, res = NextApiResponse) => {
  const { q } = req.query;
  const API_KEY = 'fc597802-69b2-45dd-a437-ec7f5f6de264';
  const API_URL = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${API_KEY}`;

  try {
    const response = await axios.get(API_URL);
    const data = response.data.data;

    if (q) {
      const filteredData = data.filter(crypto => crypto.name.toLowerCase().includes(q.toLowerCase()));
      return res.status(200).json(filteredData);
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching data from CoinMarketCap API' });
  }
};
