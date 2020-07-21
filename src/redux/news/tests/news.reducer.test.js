import newsReducer from '../news.reducer';
import {
  setNews,
  setNewsItem,
  getNews,
  getNewsItem,
  hideLoader,
  showLoader,
  addNewsItem
} from '../news.actions';
// import { config } from '../../../configs';
// const { languages } = config;

describe('News reducer test', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      list: [],
      newsItem: {},
      loading: false
    };
  });

  const newsExample = [
    {
      author: {
        image: 'someImage.jpeg',
        name: 'Author Name'
      },
      date: '154568794567',
      title: 'Test title'
    },
    {
      author: {
        image: 'otherImage.jpeg',
        name: 'Second Author Name'
      },
      date: '154568794567',
      title: 'Second Test title'
    }
  ];

  const newsItemExapmle = {
    author: {
      image: 'someImage.jpeg',
      name: 'Author Name'
    },
    date: '154568794567',
    title: 'Test title',
    text: 'Test text'
  };

  it('should return default state', () => {
    expect(newsReducer(initialState, {})).toEqual(initialState);
  });

  it('should return state with news', () => {
    const state = {
      loading: false,
      list: newsExample,
      newsItem: {}
    };

    expect(newsReducer(initialState, setNews(newsExample))).toEqual(state);
  });

  it('should return news array', () => {
    const state = {
      loading: false,
      list: newsExample,
      newsItem: {}
    };

    expect(newsReducer(state, getNews()).list).toEqual(newsExample);
  });

  it('should return state with newsItemExample', () => {
    const state = {
      loading: false,
      list: [],
      newsItem: newsItemExapmle
    };

    expect(newsReducer(state, setNewsItem(newsItemExapmle))).toEqual(state);
  });

  it('should return newsItem', () => {
    const state = {
      loading: false,
      list: [],
      newsItem: newsItemExapmle
    };

    expect(newsReducer(state, getNewsItem()).newsItem).toEqual(newsItemExapmle);
  });

  it('should set loading to false', () => {
    const state = {
      ...initialState,
      loading: false
    };

    expect(newsReducer(initialState, hideLoader())).toEqual(state);
  });

  it('should set loading to true', () => {
    const state = {
      ...initialState,
      loading: true
    };

    expect(newsReducer(initialState, showLoader())).toEqual(state);
  });
});
