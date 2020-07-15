import React, { useState, useEffect } from 'react';
import { Paper, TextField, FormControl, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { useStyles } from './news-details.styles';
import { SaveButton } from '../../../components/buttons';
import { config } from '../../../configs';
import LoadingBar from '../../../components/loading-bar';
import { getNewsItem, updateNewsItem } from '../../../redux/news/news.actions';

const { languages } = config;
const NewsDetails = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, newsItem } = useSelector(({ News }) => ({
    loading: News.loading,
    newsItem: News.newsItem
  }));
  const classes = useStyles();

  const [authorPhoto, setAuthorPhoto] = useState('');
  const [newsImage, setNewsImage] = useState('');
  const [newsVideo, setNewsVideo] = useState('');

  const [ukAuthorName, ukSetAuthor] = useState('');
  const [ukText, ukSetText] = useState('');
  const [ukTitle, ukSetTitle] = useState('');

  const [enAuthorName, enSetAuthor] = useState('');
  const [enText, enSetText] = useState('');
  const [enTitle, enSetTitle] = useState('');

  const { id } = match.params;
  useEffect(() => {
    dispatch(getNewsItem(id));

    setAuthorPhoto(newsItem.author.image.small);
    setNewsImage(newsItem.images.primary.medium);
    setNewsVideo(newsItem.video);

    ukSetAuthor(newsItem.author.name[0].value);
    ukSetText(newsItem.text[0].value);
    ukSetTitle(newsItem.title[0].value);

    enSetAuthor(newsItem.author.name[1].value);
    enSetText(newsItem.text[1].value);
    enSetTitle(newsItem.title[1].value);
  }, [newsItem, dispatch, id]);

  const newsSaveHandler = async (e) => {
    e.preventDefault();
    const newNewsItem = {
      video: newsVideo,
      author: {
        name: [
          {
            lang: languages[0],
            value: ukAuthorName
          },
          {
            lang: languages[1],
            value: enAuthorName
          }
        ],
        image: {
          small: authorPhoto
        }
      },
      title: [
        {
          lang: languages[0],
          value: ukTitle
        },
        {
          lang: languages[1],
          value: enTitle
        }
      ],
      text: [
        {
          lang: languages[0],
          value: ukText
        },
        {
          lang: languages[1],
          value: enText
        }
      ],
      images: {
        primary: {
          medium: newsImage
        }
      }
    };
    dispatch(updateNewsItem({ id, newNewsItem }));
  };

  const authorPhotoHandler = (e) => {
    setAuthorPhoto(e.target.value);
  };
  const newsImageHandler = (e) => {
    setNewsImage(e.target.value);
  };
  const newsVideoHandler = (e) => {
    setNewsVideo(e.target.value);
  };

  const ukAuthorHandler = (e) => {
    ukSetAuthor(e.target.value);
  };
  const ukTextHandler = (e) => {
    ukSetText(e.target.value);
  };
  const ukTitleHandler = (e) => {
    ukSetTitle(e.target.value);
  };

  const enAuthorHandler = (e) => {
    enSetAuthor(e.target.value);
  };
  const enTextHandler = (e) => {
    enSetText(e.target.value);
  };
  const enTitleHandler = (e) => {
    enSetTitle(e.target.value);
  };

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={newsSaveHandler}>
        <FormControl className={classes.newsAdd}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={classes.newsItemAdd}>
                <TextField
                  id='authorPhoto'
                  className={classes.textfield}
                  variant='outlined'
                  label='Фото автора'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={authorPhoto}
                  onChange={authorPhotoHandler}
                  required
                />
                <TextField
                  id='newsImage'
                  className={classes.textfield}
                  variant='outlined'
                  label='Головне зображення'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={newsImage}
                  onChange={newsImageHandler}
                  required
                />
                <TextField
                  id='newsVideo'
                  className={classes.textfield}
                  variant='outlined'
                  label='Посилання на відео'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={newsVideo}
                  onChange={newsVideoHandler}
                  required
                />
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.newsItemAdd}>
                <TextField
                  id='ukAuthorName'
                  className={classes.textfield}
                  variant='outlined'
                  label='Автор (укр.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={ukAuthorName}
                  onChange={ukAuthorHandler}
                  required
                />
                <TextField
                  id='ukTitle'
                  className={classes.textfield}
                  variant='outlined'
                  label='Заголовок (укр.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={ukTitle}
                  onChange={ukTitleHandler}
                  required
                />
                <TextField
                  id='ukText'
                  className={classes.textfield}
                  variant='outlined'
                  label='Текст (укр.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={ukText}
                  onChange={ukTextHandler}
                  required
                />
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.newsItemAdd}>
                <TextField
                  id='enAuthorName'
                  className={classes.textfield}
                  variant='outlined'
                  label='Автор (англ.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={enAuthorName}
                  onChange={enAuthorHandler}
                  required
                />
                <TextField
                  id='enTitle'
                  className={classes.textfield}
                  variant='outlined'
                  label='Заголовок (англ.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={enTitle}
                  onChange={enTitleHandler}
                  required
                />
                <TextField
                  id='enText'
                  className={classes.textfield}
                  variant='outlined'
                  label='Текст (англ.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={enText}
                  onChange={enTextHandler}
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
