import { styled } from '../../../stitches.config';

export const Container = styled('div', {
  mx: 'auto',
  px: '$4',

  variants: {
    size: {
      1: {
        maxWidth: '300px'
      },
      2: {
        maxWidth: '585px'
      },
      3: {
        maxWidth: '865px'
      },
      4: {
        maxWidth: '1200px'
      }
    }
  }
});