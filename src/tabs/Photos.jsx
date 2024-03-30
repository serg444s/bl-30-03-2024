import { getPhotos } from 'apiService/photos';
import { Text } from 'components';
import { Form } from 'components';
import { useEffect } from 'react';
import { useState } from 'react';

export const Photos = () => {
  const [query, setQuery] = useState('');
  const [page, setPege] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getPhotos(query, page);
        console.log(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, query]);

  const onHandleSubmit = value => {
    setQuery(value);
  };

  return (
    <>
      <Form onSubmit={onHandleSubmit} />
      <Text textAlign="center">Let`s begin search 🔎</Text>
    </>
  );
};
