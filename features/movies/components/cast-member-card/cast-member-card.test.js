import React from 'react';

import { render } from '../../../../test-utils';

import { CastMemberCard } from '.';

import { IMAGE_BASE_URL } from '~/utils/config';

describe('CastMemberCard', () => {
  const castMember = {
    id: 123,
    name: 'Jamie Lee Curtis',
    profilePath: '/image.jpg',
    character: 'Laurie Strode'
  };

  it('should display cast member image', () => {
    const { getByAltText } = render(<CastMemberCard castMember={castMember} />);
    expect(getByAltText(castMember.name)).toHaveAttribute(
      'src',
      `${IMAGE_BASE_URL}original/image.jpg`
    );
  });

  it('should display cast member name and character', () => {
    const { getByText } = render(<CastMemberCard castMember={castMember} />);
    expect(getByText(castMember.name)).toBeInTheDocument();
    expect(getByText(castMember.character)).toBeInTheDocument();
  });

  it('should display placeholder if loading', () => {
    const { getByTestId } = render(<CastMemberCard isLoading />);
    expect(getByTestId('placeholder')).toBeInTheDocument();
  });

  it('should display placeholder image if profile image does not exist', async () => {
    const castMemberWithNoProfileImage = {
      id: 123,
      name: 'Jamie Lee Curtis',
      character: 'Laurie Strode'
    };
    const { getByAltText } = render(
      <CastMemberCard castMember={castMemberWithNoProfileImage} />
    );
    expect(getByAltText(castMemberWithNoProfileImage.name)).toHaveAttribute(
      'src',
      '/movie-poster-placeholder.svg'
    );
  });
});
