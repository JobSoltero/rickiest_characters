import { all, fork } from 'redux-saga/effects';
import { watchFetchCharacters } from './features/characters/charactersSaga';
import { watchFavorites } from './features/favorites/favoritesSaga';

export default function* rootSaga() {
  yield all([
    fork(watchFetchCharacters),
    fork(watchFavorites),
  ]);
}
