import { all, fork } from 'redux-saga/effects';
import { watchFetchCharacters } from './features/characters/charactersSaga';

export default function* rootSaga() {
  yield all([
    fork(watchFetchCharacters),
  ]);
}
