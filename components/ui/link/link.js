import * as React from 'react';
import { useLink } from '@react-aria/link';
import NextLink from 'next/link';

import { Text } from '../text';
import { styled } from '../../../stitches.config';
import { Box } from '..';

const StyledLink = styled('a', {
  alignItems: 'center',
  gap: '$1',
  flexShrink: 0,
  outline: 'none',
  textDecorationLine: 'none',
  textUnderlineOffset: '3px',
  textDecorationColor: '$sage4',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  lineHeight: 'inherit',
  '&:hover': {
    textDecorationLine: 'underline'
  },
  '&:focus': {
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineOffset: '2px',
    textDecorationLine: 'none'
  },
  [`& ${Text}`]: {
    color: 'inherit'
  },
  variants: {
    variant: {
      blue: {
        color: '$blue11',
        textDecorationColor: '$blue4',
        '&:focus': {
          outlineColor: '$blue8'
        }
      },
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
    variant: 'subtle'
  }
});

export const Link = React.forwardRef((props, forwardedRef) => {
  const { linkProps } = useLink(props, forwardedRef);
  return <StyledLink {...linkProps} {...props} ref={forwardedRef} />;
});
Link.displayName = 'Link';
