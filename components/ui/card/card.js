import { styled } from '../../../stitches.config';

export const Card = styled('div', {
  display: 'flex',
  flexShrink: 0,
  flexDirection: 'column',
  width: '215px',
  height: '315px',
  overflow: 'hidden',
  borderRadius: 10,
  boxShadow: '0 6px 10px -5px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 20px 20px -15px rgba(0, 0, 0, 0.3)'
  }
});
