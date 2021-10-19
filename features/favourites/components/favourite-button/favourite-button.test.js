import React from 'react';
import * as auth from '@auth0/nextjs-auth0';

import { render, fireEvent } from '../../../../test-utils';

import { FavouriteButton } from './favourite-button';

import * as useIsFavouriteHook from '~/features/favourites/queries/use-is-favourite';
import * as useAddFavouriteHook from '~/features/favourites/queries/use-add-favourite';
import * as useRemoveFavouriteHook from '~/features/favourites/queries/use-remove-favourite';

jest.mock('@auth0/nextjs-auth0', () => ({
  __esModule: true,
  ...jest.requireActual('@auth0/nextjs-auth0')
}));

jest.mock('use-debounce', () => ({
  useDebouncedCallback: props => props
}));

describe('FavouriteButton', () => {
  let useUser;
  let useIsFavourite;
  let useAddFavourite;
  let useRemoveFavourite;

  const addFavourite = jest.fn();
  const removeFavourite = jest.fn();

  beforeEach(() => {
    useUser = jest.spyOn(auth, 'useUser').mockReturnValue({ user: 'name' });
    useIsFavourite = jest.spyOn(useIsFavouriteHook, 'useIsFavourite');
    useAddFavourite = jest
      .spyOn(useAddFavouriteHook, 'useAddFavourite')
      .mockReturnValue({ mutate: addFavourite });
    useRemoveFavourite = jest
      .spyOn(useRemoveFavouriteHook, 'useRemoveFavourite')
      .mockReturnValue({ mutate: removeFavourite });
  });

  afterEach(() => {
    useUser.mockReset();
    useIsFavourite.mockReset();
    useAddFavourite.mockReset();
    useRemoveFavourite.mockReset();
  });

  it('should display heart outline if not a favourite', () => {
    useIsFavourite.mockReturnValue({ data: false });
    const { getByRole } = render(<FavouriteButton id="123" />);
    expect(
      getByRole('button', { name: 'favourite-heart-outline' })
    ).toBeInTheDocument();
  });

  it('should display filled heart if a favourite', () => {
    useIsFavourite.mockReturnValue({ data: true });
    const { getByRole } = render(<FavouriteButton id="123" />);
    expect(
      getByRole('button', { name: 'favourite-heart' })
    ).toBeInTheDocument();
  });

  it('should add favourite on click if not a favourite', () => {
    useIsFavourite.mockReturnValue({ data: false });
    const { getByRole } = render(<FavouriteButton id="123" />);
    const button = getByRole('button', { name: 'favourite-heart-outline' });
    fireEvent.click(button);
    expect(addFavourite).toHaveBeenCalledWith('123');
  });

  it('should remove favourite on click if a favourite', () => {
    useIsFavourite.mockReturnValue({ data: true });
    const { getByRole } = render(<FavouriteButton id="123" />);
    const button = getByRole('button', { name: 'favourite-heart' });
    fireEvent.click(button);
    expect(removeFavourite).toHaveBeenCalledWith('123');
  });
});
