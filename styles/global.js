import { globalCss } from '@stitches/react';

export const globalStyles = globalCss({
  body: {
    margin: '0'
  },
  li: { color: '$hiContrast' },
  '.profile': {
    borderRadius: '$round'
  },
  '.rounded': {
    borderRadius: '$4'
  },
  '.top-rounded': {
    borderTopLeftRadius: '$4',
    borderTopRightRadius: '$4'
  },
  '.search-rounded': {
    borderRadius: '2px'
  }
});
