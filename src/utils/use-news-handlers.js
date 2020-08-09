import { useState } from 'react';

const useNewsHandlers = () => {
  const [authorPhoto, setAuthorPhoto] = useState('');
  const [newsImage, setNewsImage] = useState('');
  const [authorName, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');

  return {
    authorPhoto,
    newsImage,
    authorName,
    text,
    title,
    setAuthorPhoto,
    setNewsImage,
    setAuthor,
    setText,
    setTitle
  };
};

export default useNewsHandlers;
