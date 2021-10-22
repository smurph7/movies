import { getStringFromUrl } from './get-string-from-url';

describe('Get string from url', () => {
  it('should return capitalised first letters and replace spaces with hyphens', () => {
    expect(getStringFromUrl('comedy')).toEqual('Comedy');
    expect(getStringFromUrl('science-fiction')).toEqual('Science Fiction');
  });

  it('should return empty string if undefined', () => {
    expect(getStringFromUrl()).toEqual('');
  });
});
