import React from 'react';
import * as auth from '@auth0/nextjs-auth0';

import { render, fireEvent } from '../../../test-utils';

import { FavouriteButton } from './favourite-button';

import * as useFavouriteHooks from '~/features/user/hooks/use-favourites';

jest.mock('@auth0/nextjs-auth0', () => ({
  __esModule: true,
  ...jest.requireActual('@auth0/nextjs-auth0')
}));

jest.mock('use-debounce', () => ({
  useDebouncedCallback: props => props
}));

describe('FavouriteButton', () => {
  let useUser;
  let useIsFavouriteQuery;
  let useAddFavouriteMutation;
  let useRemoveFavouriteMutation;

  const addFavourite = jest.fn();
  const removeFavourite = jest.fn();

  beforeEach(() => {
    useUser = jest.spyOn(auth, 'useUser').mockReturnValue({ user: 'name' });
    useIsFavouriteQuery = jest.spyOn(useFavouriteHooks, 'useIsFavouriteQuery');
    useAddFavouriteMutation = jest
      .spyOn(useFavouriteHooks, 'useAddFavouriteMutation')
      .mockReturnValue({ mutate: addFavourite });
    useRemoveFavouriteMutation = jest
      .spyOn(useFavouriteHooks, 'useRemoveFavouriteMutation')
      .mockReturnValue({ mutate: removeFavourite });
  });

  afterEach(() => {
    useUser.mockReset();
    useIsFavouriteQuery.mockReset();
    useAddFavouriteMutation.mockReset();
    useRemoveFavouriteMutation.mockReset();
  });

  it('should display heart outline if not a favourite', () => {
    useIsFavouriteQuery.mockReturnValue({ data: false });
    const { getByRole } = render(<FavouriteButton movieId="123" />);
    expect(
      getByRole('button', { name: 'favourite-heart-outline' })
    ).toBeInTheDocument();
  });

  it('should display filled heart if a favourite', () => {
    useIsFavouriteQuery.mockReturnValue({ data: true });
    const { getByRole } = render(<FavouriteButton movieId="123" />);
    expect(
      getByRole('button', { name: 'favourite-heart' })
    ).toBeInTheDocument();
  });

  it('should add favourite on click if not a favourite', () => {
    useIsFavouriteQuery.mockReturnValue({ data: false });
    const { getByRole } = render(<FavouriteButton movieId="123" />);
    const button = getByRole('button', { name: 'favourite-heart-outline' });
    fireEvent.click(button);
    expect(addFavourite).toHaveBeenCalledWith('123');
  });

  it('should remove favourite on click if a favourite', () => {
    useIsFavouriteQuery.mockReturnValue({ data: true });
    const { getByRole } = render(<FavouriteButton movieId="123" />);
    const button = getByRole('button', { name: 'favourite-heart' });
    fireEvent.click(button);
    expect(removeFavourite).toHaveBeenCalledWith('123');
  });
});
