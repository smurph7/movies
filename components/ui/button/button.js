import * as React from 'react';
import { useButton } from '@react-aria/button';

import { styled } from '../../../stitches.config';

const StyledButton = styled('button', {
  all: 'unset',
  alignItems: 'center',
  boxSizing: 'border-box',
  userSelect: 'none',
  '&::before': {
    boxSizing: 'border-box'
  },
  '&::after': {
    boxSizing: 'border-box'
  },
  display: 'inline-flex',
  flexShrink: 0,
  justifyContent: 'center',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  lineHeight: '1',
  height: '$5',
  px: '$2',
  fontFamily: '$body',
  fontVariantNumeric: 'tabular-nums',
  fontSize: '$2',
  '&:disabled': {
    backgroundColor: '$slate2',
    boxShadow: 'inset 0 0 0 1px $colors$slate7',
    color: '$slate8',
    cursor: 'not-allowed'
  },
  '&:hover': {
    cursor: 'pointer'
  },
  variants: {
    size: {
      1: {
        borderRadius: '$1',
        height: '$5',
        px: '$2',
        fontSize: '$1'
      },
      2: {
        borderRadius: '$2',
        height: '$6',
        px: '$3',
        fontSize: '$3'
      },
      3: {
        borderRadius: '$2',
        height: '$7',
        px: '$4',
        fontSize: '$4'
      }
    },
    variant: {
      gray: {
        backgroundColor: '$loContrast',
        boxShadow: 'inset 0 0 0 1px $colors$slate7',
        color: '$hiContrast',
        '&:hover': {
          boxShadow: 'inset 0 0 0 1px $colors$slate8'
        },
        '&:active': {
          backgroundColor: '$slate2',
          boxShadow: 'inset 0 0 0 1px $colors$slate8'
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$slate8, 0 0 0 1px $colors$slate8'
        }
      },
      transparentWhite: {
        backgroundColor: 'hsla(0,100%,100%,.2)',
        color: 'white',
        '&:hover': {
          backgroundColor: 'hsla(0,100%,100%,.25)'
        },
        '&:active': {
          backgroundColor: 'hsla(0,100%,100%,.3)'
        },
        '&:focus': {
          boxShadow:
            'inset 0 0 0 1px hsla(0,100%,100%,.35), 0 0 0 1px hsla(0,100%,100%,.35)'
        }
      },
      transparentBlack: {
        backgroundColor: 'hsla(0,0%,0%,.2)',
        color: 'black',
        '&:hover': {
          backgroundColor: 'hsla(0,0%,0%,.25)'
        },
        '&:active': {
          backgroundColor: 'hsla(0,0%,0%,.3)'
        },
        '&:focus': {
          boxShadow:
            'inset 0 0 0 1px hsla(0,0%,0%,.35), 0 0 0 1px hsla(0,0%,0%,.35)'
        }
      }
    },
    ghost: {
      true: {
        backgroundColor: 'transparent',
        boxShadow: 'none'
      }
    },
    state: {
      active: {
        backgroundColor: '$slate4',
        boxShadow: 'inset 0 0 0 1px $colors$slate8',
        color: '$slate11',
        '&:hover': {
          backgroundColor: '$slate5',
          boxShadow: 'inset 0 0 0 1px $colors$slate8'
        },
        '&:active': {
          backgroundColor: '$slate5'
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$slate8, 0 0 0 1px $colors$slate8'
        }
      },
      waiting: {
        backgroundColor: '$slate4',
        boxShadow: 'inset 0 0 0 1px $colors$slate8',
        color: 'transparent',
        pointerEvents: 'none',
        '&:hover': {
          backgroundColor: '$slate5',
          boxShadow: 'inset 0 0 0 1px $colors$slate8'
        },
        '&:active': {
          backgroundColor: '$slate5'
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$slate8'
        }
      }
    }
  },
  compoundVariants: [
    {
      variant: 'gray',
      ghost: 'true',
      css: {
        backgroundColor: 'transparent',
        color: '$hiContrast',
        '&:hover': {
          backgroundColor: '$slateA3',
          boxShadow: 'none'
        },
        '&:active': {
          backgroundColor: '$slateA4'
        },
        '&:focus': {
          boxShadow:
            'inset 0 0 0 1px $colors$slateA8, 0 0 0 1px $colors$slateA8'
        }
      }
    }
  ],
  defaultVariants: {
    size: '1',
    variant: 'gray'
  }
});

export const Button = React.forwardRef((props, forwardedRef) => {
  const { buttonProps } = useButton(props, forwardedRef);
  return <StyledButton {...buttonProps} {...props} ref={forwardedRef} />;
});
Button.displayName = 'Button';
