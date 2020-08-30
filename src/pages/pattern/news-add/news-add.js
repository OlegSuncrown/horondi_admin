import React, { useEffect } from 'react';
import { TextField, Paper, Grid, Tabs, Tab, AppBar } from '@material-ui/core';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import TabPanel from '../../../components/tab-panel';
import { SaveButton } from '../../../components/buttons';
import LoadingBar from '../../../components/loading-bar';
import useNewsHandlers from '../../../utils/use-news-handlers';
import { useStyles } from './news-add.styles';

import { addArticle } from '../../../redux/news/news.actions';
import { config } from '../../../configs';

const { languages } = config;

const NewsAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector(({ News }) => News.newsLoading);
  const {
    tabsValue,
    checkboxes,
    preferredLanguages,
    setPreferredLanguages,
    languageCheckboxes,
    handleTabsChange,
    createArticle
  } = useNewsHandlers();

  useEffect(() => {
    const prefLanguages = [];
    Object.keys(checkboxes).forEach((key) => {
      if (checkboxes[key]) {
        prefLanguages.push(key);
      }
    });
    setPreferredLanguages(prefLanguages);
  }, [checkboxes, setPreferredLanguages]);

  const langValues = languages.map((lang) => ({
    [`${lang}AuthorName`]: '',
    [`${lang}Title`]: '',
    [`${lang}Text`]: ''
  }));

  const formikValues =
    langValues !== null ? Object.assign(...langValues) : null;
  const formik = useFormik({
    initialValues: {
      ...formikValues,
      authorPhoto: '',
      newsImage: ''
    },
    onSubmit: (values) => {
      const article = createArticle(values);
      dispatch(addArticle(article));
    }
  });
  console.log(formikValues);
  const TabPanels =
    preferredLanguages.length > 0
      ? preferredLanguages.map((lang, index) => (
        <TabPanel key={index} value={tabsValue} index={index}>
          <Paper className={classes.newsItemAdd}>
            <TextField
              data-cy={`${lang}AuthorName`}
              id={`${lang}AuthorName`}
              className={classes.textfield}
              variant='outlined'
              label={`Автор ${lang}`}
              multiline
              value={formik.values[`${lang}AuthorName`]}
              onChange={formik.handleChange}
              required
            />
            <TextField
              data-cy={`${lang}Title`}
              id={`${lang}Title`}
              className={classes.textfield}
              variant='outlined'
              label={`Заголовок ${lang}`}
              multiline
              value={formik.values[`${lang}Title`]}
              onChange={formik.handleChange}
              required
            />
            <TextField
              data-cy={`${lang}Text`}
              id={`${lang}Text`}
              className={classes.textfield}
              variant='outlined'
              label={`Текст ${lang}`}
              multiline
              value={formik.values[`${lang}Text`]}
              onChange={formik.handleChange}
              required
            />
          </Paper>
        </TabPanel>
      ))
      : null;

  const languageTabs =
    preferredLanguages.length > 0
      ? preferredLanguages.map((lang, index) => (
        <Tab label={lang} key={index} />
      ))
      : null;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.container}>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.controlsBlock}>
          <div>{languageCheckboxes}</div>
          <SaveButton
            className={classes.saveButton}
            data-cy='save'
            type='submit'
            title='Зберегти'
          />
        </div>
        {preferredLanguages.length > 0 ? (
          <div>
            <Grid item xs={12}>
              <Paper className={classes.newsItemAdd}>
                <TextField
                  data-cy='authorPhoto'
                  id='authorPhoto'
                  className={classes.textfield}
                  variant='outlined'
                  label='Фото автора'
                  value={formik.values.authorPhoto}
                  onChange={formik.handleChange}
                  required
                />
                <TextField
                  data-cy='newsImage'
                  id='newsImage'
                  className={classes.textfield}
                  variant='outlined'
                  label='Головне зображення'
                  value={formik.values.newsImage}
                  onChange={formik.handleChange}
                  required
                />
              </Paper>
            </Grid>
            <AppBar position='static'>
              <Tabs
                className={classes.tabs}
                value={tabsValue}
                onChange={handleTabsChange}
                aria-label='simple tabs example'
              >
                {languageTabs}
              </Tabs>
            </AppBar>
            {TabPanels}
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default NewsAdd;
