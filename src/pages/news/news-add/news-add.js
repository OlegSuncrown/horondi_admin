import React, { useState } from 'react';
import { FormControl, Paper, TextField, Grid } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AppBar from '@material-ui/core/AppBar';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './news-add.styles';
import { SaveButton } from '../../../components/buttons';
import { addArticle } from '../../../redux/news/news.actions';
import LoadingBar from '../../../components/loading-bar';
import TabPanel from '../../../components/tab-panel';
import { config } from '../../../configs';
import useNewsHandlers from '../../../utils/use-news-handlers';

const { languages } = config;

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const NewsAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector(({ News }) => News.newsLoading);
  const [value, setValue] = useState(0);
  const [language, setLanguage] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    authorPhoto,
    newsImage,
    ukAuthorName,
    ukText,
    ukTitle,
    enAuthorName,
    enText,
    enTitle,
    setAuthorPhoto,
    setNewsImage,
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
      author: {
        name: [
          {
            lang: languages[0],
            value: ukAuthorName || null
          },
          {
            lang: languages[1],
            value: enAuthorName || null
          }
        ],
        image: {
          small: authorPhoto
        }
      },
      title: [
        {
          lang: languages[0],
          value: ukTitle || null
        },
        {
          lang: languages[1],
          value: enTitle || null
        }
      ],
      text: [
        {
          lang: languages[0],
          value: ukText || null
        },
        {
          lang: languages[1],
          value: enText || null
        }
      ],
      images: {
        primary: {
          medium: newsImage
        },
        additional: {
          large: 'Test_additional_photo'
        }
      },
      date: new Date().toISOString()
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
              <MenuItem value='multilanguage'>Декілька мов</MenuItem>
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
                  className={classes.textfield}
                  variant='outlined'
                  label='Фото автора'
                  multiline
                  value={authorPhoto}
                  onChange={(e) => setAuthorPhoto(e.target.value)}
                  required
                />
                <TextField
                  id='newsImage'
                  className={classes.textfield}
                  variant='outlined'
                  label='Головне зображення'
                  multiline
                  value={newsImage}
                  onChange={(e) => setNewsImage(e.target.value)}
                  required
                />
              </Paper>
            </Grid>
          </Grid>
        </FormControl>
        <AppBar position='static'>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='simple tabs example'
          >
            {language === 'uk' || language === 'multilanguage' ? (
              <Tab label='uk' {...a11yProps(0)} />
            ) : null}
            {language === 'en' || language === 'multilanguage' ? (
              <Tab label='en' {...a11yProps(1)} />
            ) : null}
          </Tabs>
        </AppBar>
        {language !== '' ? (
          <div>
            <TabPanel value={value} index={0}>
              <Grid item xs={12}>
                <Paper className={classes.newsItemAdd}>
                  <TextField
                    id='ukAuthorName'
                    className={classes.textfield}
                    variant='outlined'
                    label='Автор (укр.)'
                    multiline
                    value={ukAuthorName}
                    onChange={(e) => ukSetAuthor(e.target.value)}
                    required
                  />
                  <TextField
                    id='ukTitle'
                    className={classes.textfield}
                    variant='outlined'
                    label='Заголовок (укр.)'
                    multiline
                    value={ukTitle}
                    onChange={(e) => ukSetTitle(e.target.value)}
                    required
                  />
                  <TextField
                    id='ukText'
                    className={classes.textfield}
                    variant='outlined'
                    label='Текст (укр.)'
                    multiline
                    value={ukText}
                    onChange={(e) => ukSetText(e.target.value)}
                    required
                  />
                </Paper>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid item xs={12}>
                <Paper className={classes.newsItemAdd}>
                  <TextField
                    id='enAuthorName'
                    className={classes.textfield}
                    variant='outlined'
                    label='Автор (англ.)'
                    multiline
                    value={enAuthorName}
                    onChange={(e) => enSetAuthor(e.target.value)}
                    required
                  />
                  <TextField
                    id='enTitle'
                    className={classes.textfield}
                    variant='outlined'
                    label='Заголовок (англ.)'
                    multiline
                    value={enTitle}
                    onChange={(e) => enSetTitle(e.target.value)}
                    required
                  />
                  <TextField
                    id='enText'
                    className={classes.textfield}
                    variant='outlined'
                    label='Текст (англ.)'
                    multiline
                    value={enText}
                    onChange={(e) => enSetText(e.target.value)}
                    required
                  />
                </Paper>
              </Grid>
            </TabPanel>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default NewsAdd;
