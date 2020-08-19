import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useStyles } from './news-add.styles';
import { uploadFile } from '../../../redux/news/news.operations';
import { client } from '../../../utils/client';

const NewsAdd = () => {
  const classes = useStyles();

  const onChangeHandler = (e) => {
    const [file] = e.target.files;
    console.log(file);
    uploadFile(file);
  };

  return (
    <div className={classes.container}>
      <input type='file' required onChange={(e) => onChangeHandler(e)} />;
    </div>
  );
};

export default NewsAdd;
