import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useStyles } from './news-add.styles';
import { uploadFile } from '../../../redux/news/news.operations';

const NewsAdd = () => {
  const classes = useStyles();
  const [photo, setPhoto] = useState(
    'https://horondi.blob.core.windows.net/horondi/images/large_4mbuxg22vtke18gw5i_test_photo_6.png'
  );

  const onDrop = async ([file]) => {
    console.log(file);
    const uploadPhoto = await uploadFile(file);
    setPhoto(uploadPhoto.path.large);
    console.log(uploadPhoto.path.large);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className={classes.container}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag n drop some files here, or click to select files</p>
        )}
      </div>
      <img src={photo} alt='' />
    </div>
  );
};

export default NewsAdd;
