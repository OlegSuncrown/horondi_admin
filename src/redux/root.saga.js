import { all } from 'redux-saga/effects';
import newsSaga from './news/news.sagas';
import authSaga from './auth/auth.sagas';
import themeSaga from './theme/theme.sagas';
import contactsSaga from './contact/contact.sagas';

export default function* rootSaga() {
  yield all([contactsSaga(), newsSaga(), authSaga(), themeSaga()]);
}
