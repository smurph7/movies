import { styled } from '../../../stitches.config';

export const Card = styled('div', {
  display: 'flex',
  flexShrink: 0,
  flexDirection: 'column',
  width: '233px',
  height: '350px',
  overflow: 'hidden',
  borderRadius: 10,
  boxShadow: '0 6px 10px -5px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s ease',
  userSelect: 'none',
  zIndex: 1000,
  '@bp1': {
    width: '280px',
    height: '421px'
  },
  '@bp2': {
    width: '180px',
    height: '270px'
  },
  '@bp3': {
    width: '140px',
    height: '210px'
  },
  '@bp4': {
    width: '180px',
    height: '270px'
  },
  variants: {
    bounceOnHover: {
      true: {
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 20px 20px -15px rgba(0, 0, 0, 0.3)'
        }
      }
    },
    hasLabel: {
      true: {
        width: '200px',
        height: '300px'
      }
    }
  }
});
