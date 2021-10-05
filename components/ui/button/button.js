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
    backgroundColor: '$sage2',
    boxShadow: 'inset 0 0 0 1px $colors$sage7',
    color: '$sage8',
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
        boxShadow: 'inset 0 0 0 1px $colors$sage7',
        color: '$sage11',
        '&:hover': {
          boxShadow: 'inset 0 0 0 1px $colors$sage8'
        },
        '&:active': {
          backgroundColor: '$sage2',
          boxShadow: 'inset 0 0 0 1px $colors$sage8'
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$sage8, 0 0 0 1px $colors$sage8'
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
        backgroundColor: '$sage4',
        boxShadow: 'inset 0 0 0 1px $colors$sage8',
        color: '$sage11',
        '&:hover': {
          backgroundColor: '$sage5',
          boxShadow: 'inset 0 0 0 1px $colors$sage8'
        },
        '&:active': {
          backgroundColor: '$sage5'
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$sage8, 0 0 0 1px $colors$sage8'
        }
      },
      waiting: {
        backgroundColor: '$sage4',
        boxShadow: 'inset 0 0 0 1px $colors$sage8',
        color: 'transparent',
        pointerEvents: 'none',
        '&:hover': {
          backgroundColor: '$sage5',
          boxShadow: 'inset 0 0 0 1px $colors$sage8'
        },
        '&:active': {
          backgroundColor: '$sage5'
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$sage8'
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
          backgroundColor: '$sage3',
          boxShadow: 'none'
        },
        '&:active': {
          backgroundColor: '$sage4'
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$sageA8, 0 0 0 1px $colors$sage8'
        }
      }
    }
  ],
  defaultVariants: {
    size: 1,
    variant: 'gray'
  }
});

export const Button = React.forwardRef((props, forwardedRef) => {
  const { buttonProps } = useButton(props, forwardedRef);
  return <StyledButton {...buttonProps} {...props} ref={forwardedRef} />;
});
Button.displayName = 'Button';
