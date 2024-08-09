import axios from 'axios';

export default async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const response = await axios.get(`http://localhost:5000/api/cryptocurrencies`, {
      params: { query }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data from backend server:', error);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      res.status(error.response.status).json({
        error: `Backend server responded with status ${error.response.status}`,
        message: error.response.data
      });
    } else if (error.request) {
      // The request was made but no response was received
      res.status(503).json({ error: 'Unable to reach backend server' });
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(500).json({ error: 'An unexpected error occurred', message: error.message });
    }
  }
};