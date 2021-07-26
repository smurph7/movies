import { getUrlFromString } from './get-url-from-string';

describe('Get url from string', () => {
  it('should return lower case and replace spaces with hyphens', () => {
    expect(getUrlFromString('Black Widow')).toEqual('black-widow');
  });

  it('should remove special characters', () => {
    expect(
      getUrlFromString(`Black *(+=-)!@#$^&%*()+=-[]/{}|:<>?,. Widow`)
    ).toEqual('black-widow');
  });

  it('should remove hyphens if more than one', () => {
    expect(getUrlFromString(`Ab's & Aya's Movie`)).toEqual('abs-ayas-movie');
  });
});
