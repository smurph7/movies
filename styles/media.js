import { createMedia } from '@artsy/fresnel';
import { breakpoints } from '~/utils/config';

const AppMedia = createMedia({
  breakpoints
});

export const mediaStyles = AppMedia.createMediaStyle();
export const { Media, MediaContextProvider } = AppMedia;
