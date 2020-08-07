import { useState } from 'react';

const useNewsHandlers = () => {
  const [authorPhoto, setAuthorPhoto] = useState('');
  const [newsImage, setNewsImage] = useState('');
  const [newsVideo, setNewsVideo] = useState('');

  const [authorName, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');

  return {
    authorPhoto,
    newsImage,
    newsVideo,
    authorName,
    text,
    title,
    setAuthorPhoto,
    setNewsImage,
    setNewsVideo,
    setAuthor,
    setText,
    setTitle
  };
};

export default useNewsHandlers;
