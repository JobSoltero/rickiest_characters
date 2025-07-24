import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchFavoritesSuccess,
  fetchFavoritesFailure,
  fetchFavoritesStart,
  addFavoriteSuccess,
  addFavoriteFailure,
  addFavoriteStart,
  removeFavoriteSuccess,
  removeFavoriteFailure,
  removeFavoriteStart,
} from './favoritesSlice';
import { Character } from '@/types';

const FAVORITES_API_URL = 'http://localhost:3001/favorites';

// --- API Functions ---
async function getFavoritesApi(): Promise<Character[]> {
  const res = await fetch(FAVORITES_API_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch favorites');
  }
  return res.json();
}

async function addFavoriteApi(character: Character): Promise<Character> {
  // json-server puede ser quisquilloso con los tipos de ID. Estandarizamos a string.
  const characterToSend = {
    ...character,
    id: String(character.id),
  };

  const res = await fetch(FAVORITES_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(characterToSend),
  });
  if (!res.ok) {
    throw new Error('Failed to add favorite');
  }
  return res.json();
}

async function removeFavoriteApi(characterId: string): Promise<void> {
  const res = await fetch(`${FAVORITES_API_URL}/${characterId}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to remove favorite');
  }
  // Las peticiones DELETE usualmente no retornan un cuerpo (body),
  // por lo que no intentamos parsear una respuesta JSON.
}

// --- Worker Sagas ---
function* fetchFavoritesSaga(): Generator<any, void, any> {
  try {
    const favorites: Character[] = yield call(getFavoritesApi);
    yield put(fetchFavoritesSuccess(favorites));
  } catch (error: any) {
    yield put(fetchFavoritesFailure(error.message));
  }
}

function* addFavoriteSaga(action: ReturnType<typeof addFavoriteStart>): Generator<any, void, any> {
  try {
    // The payload is the full character object
    const newFavorite: Character = yield call(addFavoriteApi, action.payload);
    yield put(addFavoriteSuccess(newFavorite));
  } catch (error: any) {
    yield put(addFavoriteFailure(error.message));
  }
}

function* removeFavoriteSaga(action: ReturnType<typeof removeFavoriteStart>): Generator<any, void, any> {
  try {
    // Estandarizamos el ID a string para la API y el estado de Redux.
    const characterId = String(action.payload);
    yield call(removeFavoriteApi, characterId);
    yield put(removeFavoriteSuccess(characterId));
  } catch (error: any) {
    yield put(removeFavoriteFailure(error.message));
  }
}

// --- Watcher Saga ---
export function* watchFavorites() {
  yield takeLatest(fetchFavoritesStart.type, fetchFavoritesSaga);
  yield takeLatest(addFavoriteStart.type, addFavoriteSaga);
  yield takeLatest(removeFavoriteStart.type, removeFavoriteSaga);
}