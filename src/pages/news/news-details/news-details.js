import React, { useEffect } from 'react';
import { Paper, TextField, FormControl, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { useStyles } from './news-details.styles';
import { SaveButton } from '../../../components/buttons';
// import { config } from '../../../configs';
import useNewsHandlers from '../../../utils/use-news-handlers';

import LoadingBar from '../../../components/loading-bar';
import { getArticle, updateArticle } from '../../../redux/news/news.actions';

// const { languages } = config;
const NewsDetails = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, newsArticle } = useSelector(({ News }) => ({
    loading: News.newsLoading,
    newsArticle: News.newsArticle
  }));
  const classes = useStyles();

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

  const { id } = match.params;
  useEffect(() => {
    dispatch(getArticle(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (newsArticle !== null) {
      console.log('not null');
    }
  }, [newsArticle]);

  const newsSaveHandler = async (e) => {
    e.preventDefault();
    const newArticle = {};
    dispatch(updateArticle({ id, newArticle }));
  };

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.detailsContainer}>
      <form className={classes.form} onSubmit={newsSaveHandler}>
        <FormControl className={classes.newsDetails}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={classes.newsItemUpdate}>
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
        <SaveButton
          id='save'
          type='submit'
          title='Зберегти'
          className={classes.saveButton}
        />
      </form>
    </div>
  );
};

NewsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

export default withRouter(NewsDetails);
