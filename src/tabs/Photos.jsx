// import { getPhotos } from 'apiService/photos';
import { Text } from 'components';
import { Form } from 'components';
import { useState } from 'react';

export const Photos = () => {
  const [query, setQuery] = useState('');

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
