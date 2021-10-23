import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';

import { styled } from '../../../stitches.config';
import { Button } from '..';

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
});

export function Dialog({ children, ...props }) {
  return (
    <DialogPrimitive.Root {...props}>
      <StyledOverlay />
      {children}
    </DialogPrimitive.Root>
  );
}

const StyledContent = styled(DialogPrimitive.Content, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 200,
  maxHeight: '85vh',
  padding: '$4',
  marginTop: '-5vh',
  willChange: 'transform',
  borderRadius: '$2',
  bg: '$sage3',

  '&:focus': {
    outline: 'none'
  }
});

const StyledCloseButton = styled(DialogPrimitive.Close, {
  position: 'absolute',
  top: '$2',
  right: '$2'
});

export const DialogContent = React.forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <StyledContent {...props} ref={forwardedRef}>
      {children}
      <StyledCloseButton asChild>
        <Button ghost>
          <Cross1Icon />
        </Button>
      </StyledCloseButton>
    </StyledContent>
  )
);
DialogContent.displayName = 'DialogContent';

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;
