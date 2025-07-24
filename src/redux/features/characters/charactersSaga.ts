import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { fetchCharactersSuccess, fetchCharactersFailure, fetchCharactersStart } from './charactersSlice';
import { ApiResponse } from '@/types';

async function getCharactersApi(): Promise<ApiResponse> {
  const res = await fetch('https://rickandmortyapi.com/api/character');
  if (!res.ok) {
    throw new Error('Failed to fetch data from Rick and Morty API');
  }
  return res.json();
}

function* fetchCharactersSaga(): Generator<any, void, any> {
  try {
    const data: ApiResponse = yield call(getCharactersApi);
    yield put(fetchCharactersSuccess(data.results));
  } catch (error: any) {
    yield put(fetchCharactersFailure(error.message));
  }
}

export function* watchFetchCharacters() {
  yield takeLatest(fetchCharactersStart.type, fetchCharactersSaga);
}
