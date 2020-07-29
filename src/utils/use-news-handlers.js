import { useState } from 'react';

const useNewsHandlers = () => {
  const [authorPhoto, setAuthorPhoto] = useState('');
  const [newsImage, setNewsImage] = useState('');
  const [newsVideo, setNewsVideo] = useState('');

  const [ukAuthorName, ukSetAuthor] = useState('');
  const [ukText, ukSetText] = useState([
    {
      type: 'heading-one',
      children: [{ text: 'Текст (укр.)' }]
    }
  ]);
  const [ukTitle, ukSetTitle] = useState('');

  const [enAuthorName, enSetAuthor] = useState('');
  const [enText, enSetText] = useState([
    {
      type: 'heading-one',
      children: [{ text: 'Текст (англ.)' }]
    }
  ]);
  const [enTitle, enSetTitle] = useState('');

  return {
    authorPhoto,
    newsImage,
    newsVideo,
    ukAuthorName,
    ukText,
    ukTitle,
    enAuthorName,
    enText,
    enTitle,
    setAuthorPhoto,
    setNewsImage,
    setNewsVideo,
    ukSetAuthor,
    ukSetText,
    ukSetTitle,
    enSetAuthor,
    enSetText,
    enSetTitle
  };
};

export default useNewsHandlers;
