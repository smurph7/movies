import { styled } from '../../../stitches.config';

export const Text = styled('p', {
  fontFamily: '$body',
  fontSize: '$3',
  lineHeight: '1',
  margin: '0',
  fontWeight: 400,
  fontVariantNumeric: 'tabular-nums',
  display: 'block',
  variants: {
    fontWeight: { bold: { fontWeight: 'bold' } },
    fontSize: {
      1: {
        fontSize: '$1'
      },
      2: {
        fontSize: '$2'
      },
      3: {
        fontSize: '$3'
      },
      4: {
        fontSize: '$4'
      },
      5: {
        fontSize: '$5',
        letterSpacing: '-.015em'
      },
      6: {
        fontSize: '$6',
        letterSpacing: '-.016em'
      },
      7: {
        fontSize: '$7',
        letterSpacing: '-.031em',
        textIndent: '-.005em'
      },
      8: {
        fontSize: '$8',
        letterSpacing: '-.034em',
        textIndent: '-.018em'
      },
      9: {
        fontSize: '$9',
        letterSpacing: '-.055em',
        textIndent: '-.025em'
      }
    },
    truncate: {
      true: {
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical'
      }
    },
    heading: {
      true: {
        fontFamily: '$heading',
        fontWeight: 'bold',
        fontSize: '$4'
      }
    }
  }
});
