import React, { useState } from 'react';
import { FormControl, Paper, TextField, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useStyles } from './news-add.styles';
import { SaveButton } from '../../../components/buttons';
import { addArticle } from '../../../redux/news/news.actions';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';
import useNewsHandlers from '../../../utils/use-news-handlers';

const { languages } = config;

const NewsAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector(({ News }) => News.newsLoading);

  const [language, setLanguage] = useState('');

  const {
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
  } = useNewsHandlers();

  const newsSaveHandler = async (e) => {
    e.preventDefault();
    const news = {
      author: {
        name: authorName,
        image: {
          small: authorPhoto
        }
      },
      text,
      title,
      lang: language,
      show: true,
      images: {
        primary: {
          medium: newsImage
        }
      }
    };
    dispatch(addArticle(news));
  };

  const languagesOptions = languages.map((lang, index) => (
    <MenuItem key={index} value={lang}>
      {lang}
    </MenuItem>
  ));

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.container}>
      <form onSubmit={newsSaveHandler}>
        <div className={classes.controlsBlock}>
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-simple-select-label'>Мова</InputLabel>
            <Select
              className={classes.select}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
            >
              {languagesOptions}
            </Select>
          </FormControl>

          <SaveButton
            className={classes.saveButton}
            id='save'
            type='submit'
            title='Зберегти'
          />
        </div>

        <FormControl className={classes.newsAdd}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={classes.newsItemAdd}>
                <TextField
                  id='authorPhoto'
                  className={classes.textField}
                  variant='outlined'
                  label='Фото автора'
                  multiline
                  value={authorPhoto}
                  onChange={(e) => setAuthorPhoto(e.target.value)}
                  required
                />
                <TextField
                  id='newsImage'
                  className={classes.textField}
                  variant='outlined'
                  label='Головне зображення'
                  multiline
                  value={newsImage}
                  onChange={(e) => setNewsImage(e.target.value)}
                  required
                />
                <TextField
                  id='authorName'
                  className={classes.textField}
                  variant='outlined'
                  label='Автор'
                  multiline
                  value={authorName}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
                <TextField
                  id='title'
                  className={classes.textField}
                  variant='outlined'
                  label='Заголовок'
                  multiline
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <TextField
                  id='text'
                  className={classes.textField}
                  variant='outlined'
                  label='Текст'
                  multiline
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                />
              </Paper>
            </Grid>
          </Grid>
        </FormControl>
      </form>
    </div>
  );
};

export default NewsAdd;
