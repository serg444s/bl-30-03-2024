import { getPhotos } from 'apiService/photos';
import { Button, Loader, PhotosGallery, Text } from 'components';
import { Form } from 'components';
import { ImageModal } from 'components/imageModal/ImageModal';
import { useEffect } from 'react';
import { useState } from 'react';

export const Photos = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { photos, per_page, total_results } = await getPhotos(
          query,
          page,
        );
        if (!photos.length) {
          setIsEmpty(true);
          return;
        }
        setImages(prevImages => [...prevImages, ...photos]);
        // setImages([...images, ...photos])
        setIsVisible(page < Math.ceil(total_results / per_page));
        // console.log(page < Math.ceil(total_results / per_page));
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
    setImages([]);
    setPage(1);
    setIsEmpty(false);
    setError(false);
    setIsVisible(false);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (url, alt) => {
    setShowModal(true);
    setAlt(alt);
    setUrl(url);
  };

  const closeModal = () => {
    setShowModal(false);
    setAlt('');
    setUrl('');
  };

  return (
    <>
      <Form onSubmit={onHandleSubmit} />
      {images.length > 0 && (
        <PhotosGallery images={images} openModal={openModal} />
      )}
      {isVisible && (
        <Button onClick={onLoadMore} disabled={isLoading}>
          {isLoading ? 'Loading' : 'Load More'}
        </Button>
      )}
      {!images.length && !isEmpty && (
        <Text textAlign="center">Let`s begin search 🔎</Text>
      )}
      {isLoading && <Loader />}
      {error && (
        <Text textAlign="center">❌ Something went wrong - {error}</Text>
      )}
      {isEmpty && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
      <ImageModal
        url={url}
        alt={alt}
        modalIsOpen={showModal}
        closeModal={closeModal}
      />
    </>
  );
};
