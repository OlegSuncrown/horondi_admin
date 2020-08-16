import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useStyles } from './news-page.styles';
import { config } from '../../../configs';
import {
  getNews,
  deleteArticle,
  setCurrentPage
} from '../../../redux/news/news.actions';

import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import TableContainerRow from '../../../components/table-container-row';
import TableContainerGenerator from '../../../components/table-container-generator';
import LoadingBar from '../../../components/loading-bar';

const { routes } = config.app;
const { REMOVE_MESSAGE } = config.messages;
const { REMOVE_TITLE } = config.buttonTitles;

const { CREATE_NEWS_TITLE } = config.buttonTitles;

const pathToNewsAddPage = routes.pathToAddNews;
const tableTitles = config.tableHeadRowTitles.news;

const NewsPage = () => {
  const classes = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { list, loading, pagesCount, currentPage, newsPerPage } = useSelector(
    ({ News }) => ({
      list: News.list,
      loading: News.newsLoading,
      pagesCount: News.pagesCount,
      currentPage: News.currentPage,
      newsPerPage: News.newsPerPage
    })
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getNews({
        limit: newsPerPage,
        skip: currentPage * newsPerPage,
        newsPerPage
      })
    );
  }, [dispatch, currentPage, newsPerPage]);

  const newsDeleteHandler = (id) => {
    const removeNews = () => {
      dispatch(closeDialog());
      dispatch(deleteArticle(id));
    };
    openSuccessSnackbar(removeNews, REMOVE_TITLE, REMOVE_MESSAGE, REMOVE_TITLE);
  };

  const changeHandler = (e, value) => dispatch(setCurrentPage(value));

  const newsItems =
    list !== undefined
      ? list.map((newsItem, index) => (
        <TableContainerRow
          key={index}
          id={newsItem.id}
          author={newsItem.author.name[0].value}
          title={newsItem.title[0].value}
          deleteHandler={() => newsDeleteHandler(newsItem._id)}
          editHandler={() => {
            dispatch(push(`/news/${newsItem._id}`));
          }}
        />
      ))
      : null;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.tableNav}>
        <Button
          id='add-news'
          component={Link}
          to={pathToNewsAddPage}
          variant='contained'
          color='primary'
        >
          {CREATE_NEWS_TITLE}
        </Button>
      </div>
      <div className={classes.tableContainer}>
        <TableContainerGenerator
          id='newsTable'
          tableTitles={tableTitles}
          tableItems={newsItems}
        />
      </div>
      <div className={classes.paginationDiv}>
        <Pagination
          count={pagesCount}
          variant='outlined'
          shape='rounded'
          page={currentPage + 1}
          onChange={changeHandler}
        />
      </div>
    </div>
  );
};

export default NewsPage;
