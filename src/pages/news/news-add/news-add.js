import React from 'react';
import { FormControl, Paper, TextField, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './news-add.styles';
import { SaveButton } from '../../../components/buttons';
import { addNewsItem } from '../../../redux/news/news.actions';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';
import useNewsHandlers from '../../../utils/use-news-handlers';

const { languages } = config;

const NewsAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector(({ News }) => News.loading);

  const {
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
  } = useNewsHandlers();

  const newsSaveHandler = async (e) => {
    e.preventDefault();
    const news = {
      video: e.target.newsVideo.value,
      author: {
        name: [
          {
            lang: languages[0],
            value: e.target.ukAuthorName.value
          },
          {
            lang: languages[1],
            value: e.target.enAuthorName.value
          }
        ],
        image: {
          small: e.target.authorPhoto.value
        }
      },
      title: [
        {
          lang: languages[0],
          value: e.target.ukTitle.value
        },
        {
          lang: languages[1],
          value: e.target.enTitle.value
        }
      ],
      text: [
        {
          lang: languages[0],
          value: e.target.ukText.value
        },
        {
          lang: languages[1],
          value: e.target.enText.value
        }
      ],
      images: {
        primary: {
          medium: e.target.newsImage.value
        },
        additional: {
          large: 'Test_additional_photo'
        }
      },
      date: new Date().toISOString()
    };
    dispatch(addNewsItem(news));
  };

  const entertaimentOptions = [
    {
      id: 'authorPhoto',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Фото автора',
      authorPhoto,
      handler: (e) => setAuthorPhoto(e.target.value),
      required: true
    },
    {
      id: 'newsImage',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Головне зображення',
      newsImage,
      handler: (e) => setNewsImage(e.target.value),
      required: true
    },
    {
      id: 'newsVideo',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Посилання на відео',
      newsVideo,
      handler: (e) => setNewsVideo(e.target.value)
    }
  ];

  const ukNewsOptions = [
    {
      id: 'ukAuthorName',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Автор (укр.)',
      ukAuthorName,
      handler: (e) => ukSetAuthor(e.target.value)
    },
    {
      id: 'ukTitle',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Заголовок (укр.)',
      ukTitle,
      handler: (e) => ukSetTitle(e.target.value),
      required: true
    },
    {
      id: 'ukText',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Текст (укр.)',
      ukText,
      handler: (e) => ukSetText(e.target.value),
      required: true
    }
  ];

  const enNewsOptions = [
    {
      id: 'enAuthorName',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Автор (англ.)',
      enAuthorName,
      handler: (e) => enSetAuthor(e.target.value)
    },
    {
      id: 'enTitle',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Заголовок (англ.)',
      enTitle,
      handler: (e) => enSetTitle(e.target.value),
      required: true
    },
    {
      id: 'enText',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Текст (англ.)',
      enText,
      handler: (e) => enSetText(e.target.value),
      required: true
    }
  ];

  const entertaimentInputs = entertaimentOptions.map(
    ({ id, className, variant, label, value, handler, required }) => (
      <TextField
        id={id}
        key={id}
        className={className}
        variant={variant}
        label={label}
        value={value}
        onChange={() => handler}
        required={required}
        multiline
        InputLabelProps={{
          classes: {
            root: classes.inputLabel,
            shrink: 'shrink'
          }
        }}
      />
    )
  );

  const ukNewsInputs = ukNewsOptions.map(
    ({ id, className, variant, label, value, handler, required }) => (
      <TextField
        id={id}
        key={id}
        className={className}
        variant={variant}
        label={label}
        value={value}
        onChange={() => handler}
        required={required}
        multiline
        InputLabelProps={{
          classes: {
            root: classes.inputLabel,
            shrink: 'shrink'
          }
        }}
      />
    )
  );

  const enNewsInputs = enNewsOptions.map(
    ({ id, className, variant, label, value, handler, required }) => (
      <TextField
        id={id}
        key={id}
        className={className}
        variant={variant}
        label={label}
        value={value}
        onChange={() => handler}
        required={required}
        multiline
        InputLabelProps={{
          classes: {
            root: classes.inputLabel,
            shrink: 'shrink'
          }
        }}
      />
    )
  );

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.container}>
      <form onSubmit={newsSaveHandler}>
        <FormControl className={classes.newsAdd}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={classes.newsItemAdd}>
                {entertaimentInputs}
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.newsItemAdd}>{ukNewsInputs}</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.newsItemAdd}>{enNewsInputs}</Paper>
            </Grid>
          </Grid>
        </FormControl>
        <SaveButton
          className={classes.saveButton}
          id='save'
          type='submit'
          title='Зберегти'
        />
      </form>
    </div>
  );
};

export default NewsAdd;
