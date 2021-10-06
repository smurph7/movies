import { styled } from '../../../stitches.config';

export const Text = styled('p', {
  fontFamily: '$body',
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
    color: {
      red: {
        color: '$red11'
      },
      crimson: {
        color: '$crimson11'
      },
      pink: {
        color: '$pink11'
      },
      purple: {
        color: '$purple11'
      },
      violet: {
        color: '$violet11'
      },
      indigo: {
        color: '$indigo11'
      },
      blue: {
        color: '$blue11'
      },
      cyan: {
        color: '$cyan11'
      },
      teal: {
        color: '$teal11'
      },
      green: {
        color: '$green11'
      },
      lime: {
        color: '$lime11'
      },
      yellow: {
        color: '$yellow11'
      },
      orange: {
        color: '$orange11'
      },
      gold: {
        color: '$gold11'
      },
      bronze: {
        color: '$bronze11'
      },
      gray: {
        color: '$sage11'
      },
      contrast: {
        color: '$hiContrast'
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
        fontWeight: '600',
        fontSize: '$4'
      }
    },
    link: {
      true: {
        alignItems: 'center',
        gap: '$1',
        flexShrink: 0,
        outline: 'none',
        textDecorationLine: 'none',
        textUnderlineOffset: '3px',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        lineHeight: 'inherit',
        cursor: 'pointer',
        '&:hover': {
          textDecorationLine: 'underline'
        }
      }
    },
    linkVariant: {
      subtle: {
        color: '$sage11',
        textDecorationColor: '$olive4',
        '&:focus': {
          outlineColor: '$sage8'
        }
      },
      contrast: {
        color: '$hiContrast',
        textDecoration: 'underline',
        textDecorationColor: '$sage4',
        '@hover': {
          '&:hover': {
            textDecorationColor: '$sage7'
          }
        },
        '&:focus': {
          outlineColor: '$sage8'
        }
      },
      blank: {
        color: '$sage11',
        '&:hover': {
          textDecoration: 'none'
        },
        '&:focus': { outline: 'none' }
      }
    }
  },
  defaultVariants: {
    fontSize: 3,
    color: 'contrast'
  }
});
