import { render } from '../../../../test-utils';

import { Cast } from '.';

import * as cast from '~/features/movies/queries/use-cast';

function mockCastMemberCard() {
  return <div data-testid="CastMemberCard" />;
}
jest.mock('~/features/ui/carousel/carousel', () => ({
  StyledCarousel: ({ children }) => children
}));
jest.mock(
  '~/features/movies/components/cast-member-card/cast-member-card',
  () => ({
    CastMemberCard: mockCastMemberCard
  })
);

describe('Cast', () => {
  let useCast;

  beforeEach(() => {
    useCast = jest.spyOn(cast, 'useCast');
  });

  afterEach(() => {
    useCast.mockReset();
  });

  it('should display a cast member for each item in data', () => {
    useCast.mockReturnValue({ data: [{ id: 1 }, { id: 2 }, { id: 3 }] });
    const { getAllByTestId } = render(<Cast id={123} />);
    expect(getAllByTestId('CastMemberCard')).toHaveLength(3);
  });
});
