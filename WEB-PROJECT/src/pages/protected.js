import React, { useEffect, useState } from 'react';
import { getHistory } from '../lib/auth';

const Protected = () => {
  const [data, setData] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHistory();
        setData(response.message);
      } catch (error) {
        setMessage(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Protected Page</h1>
      {message && <p>{message}</p>}
      {data && <p>{data}</p>}
    </div>
  );
};

export default Protected;
