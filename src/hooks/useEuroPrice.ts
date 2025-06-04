import { useEffect, useState } from 'react';
import * as contentful from 'contentful';

const client = contentful.createClient({
  space: '9kjbbn9nz1ko',
  accessToken: 'SQFfmiyJZP8A1KD2767LGvVVxJdP-bi73h6UeSkwxqE',
  environment: 'master',
});

export const useEuroPrice = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    client.getEntry('2OOjnz4DzFU13YhrVYklx0')
      .then(entry => {
        const value = Number(entry.fields.price);
        if (!isNaN(value)) setPrice(value);
        else setError('Invalid price format');
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch price');
      });
  }, []);

  return { price, error };
};
