import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CharacterCard from '../CharacterCard';
import { mockCharacter1 } from '@/__mocks__/characterMocks';
import { addFavoriteStart, removeFavoriteStart } from '@/redux/features/favorites/favoritesSlice';

// Configuración del mock store de Redux
const mockStore = configureStore([]);

describe('CharacterCard', () => {
  let store: any;

  it('debería renderizar el nombre y la imagen del personaje', () => {
    store = mockStore({
      favorites: { favoriteIds: [] },
    });

    render(
      <Provider store={store}>
        <CharacterCard character={mockCharacter1} />
      </Provider>
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByAltText('Rick Sanchez')).toHaveAttribute('src', mockCharacter1.image);
  });

  it('debería llamar a onCardClick cuando se hace clic en la tarjeta', () => {
    store = mockStore({ favorites: { favoriteIds: [] } });
    const handleCardClick = jest.fn();

    render(
      <Provider store={store}>
        <CharacterCard character={mockCharacter1} onCardClick={handleCardClick} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Rick Sanchez'));
    expect(handleCardClick).toHaveBeenCalledWith(mockCharacter1.id);
  });

  it('debería despachar la acción addFavoriteStart al hacer clic en el botón de favorito', () => {
    store = mockStore({ favorites: { favoriteIds: [] } });

    render(
      <Provider store={store}>
        <CharacterCard character={mockCharacter1} />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /añadir a favoritos/i }));
    expect(store.getActions()).toEqual([addFavoriteStart(mockCharacter1)]);
  });
});