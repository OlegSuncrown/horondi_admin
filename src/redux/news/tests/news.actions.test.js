import {
  setNews,
  getNews,
  getNewsItem,
  setNewsItem,
  showLoader,
  hideLoader,
  addNewsItem,
  updateNewsItem,
  deleteNewsItem
} from '../news.actions';

import {
  GET_NEWS,
  SET_NEWS,
  GET_NEWS_ITEM,
  SET_NEWS_ITEM,
  SHOW_LOADER,
  HIDE_LOADER,
  ADD_NEWS_ITEM,
  UPDATE_NEWS_ITEM,
  DELETE_NEWS_ITEM
} from '../news.types';

describe('News actions test', () => {
  it('should set all news to payload property', () => {
    const news = [
      {
        author: {
          image: 'image.jpg',
          name: 'Author Name'
        },
        date: '154568794567',
        title: 'Test title'
      },
      {
        author: {
          image: 'secondImage.jpg',
          name: 'Second Author Name'
        },
        date: '154568794567',
        title: 'Second Test title'
      }
    ];
    const result = {
      type: SET_NEWS,
      payload: news
    };

    expect(setNews(news)).toEqual(result);
  });

  it('should return all news', () => {
    const result = {
      type: GET_NEWS
    };

    expect(getNews()).toEqual(result);
  });
});

describe('News details actions test', () => {
  it('should set news item to payload property', () => {
    const newsItem = {
      author: {
        image: 'image.jpg',
        name: 'Author Name'
      },
      date: '154568794567',
      title: 'Test title',
      text: 'Test text'
    };

    const result = {
      type: SET_NEWS_ITEM,
      payload: newsItem
    };

    expect(setNewsItem(newsItem)).toEqual(result);
  });

  it('should return news item', () => {
    const result = {
      type: GET_NEWS_ITEM
    };

    expect(getNewsItem()).toEqual(result);
  });
});

describe('News mutation actions test', () => {
  it('should add news item', () => {
    const newsItem = {
      author: {
        image: 'image.jpg',
        name: 'Author Name'
      },
      date: '154568794567',
      title: 'Test title',
      text: 'Test text'
    };

    const result = {
      type: ADD_NEWS_ITEM,
      payload: newsItem
    };

    expect(addNewsItem(newsItem)).toEqual(result);
  });

  it('should update news item', () => {
    const updatedNewsItem = {
      author: {
        image: 'newImage.jpg',
        name: 'New Author Name'
      },
      date: '154568794567',
      title: 'New Test title',
      text: 'News Test text'
    };

    const id = '5f15cd84c4aa1855be9b1b17';

    const result = {
      type: UPDATE_NEWS_ITEM,
      payload: {
        id,
        updatedNewsItem
      }
    };

    expect(updateNewsItem({ id, updatedNewsItem })).toEqual(result);
  });

  it('should delete news item', () => {
    const id = '5f15cd84c4aa1855be9b1b17';

    const result = {
      type: DELETE_NEWS_ITEM,
      payload: id
    };

    expect(deleteNewsItem(id)).toEqual(result);
  });
});

describe('Loading actions test', () => {
  it('should change loading => true', () => {
    expect(showLoader()).toEqual({
      type: SHOW_LOADER
    });
  });

  it('should change loading => false', () => {
    expect(hideLoader()).toEqual({
      type: HIDE_LOADER
    });
  });
});
