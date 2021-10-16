import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { styled } from '../../../stitches.config';

import { Box } from '~/features/ui';

export function Popover({ trigger = 'onClick', children, ...props }) {
  const [isOpen, setIsOpen] = React.useState(false);

  function open() {
    if (trigger === 'hover') {
      setIsOpen(true);
    }
  }

  function close() {
    if (trigger === 'hover') {
      setIsOpen(false);
    }
  }

  function onOpenChange() {
    if (trigger === 'onClick') {
      setIsOpen();
    }
  }
  return (
    <Box onMouseEnter={open} onMouseLeave={close}>
      <PopoverPrimitive.Root
        open={isOpen}
        onOpenChange={onOpenChange}
        {...props}
      >
        {children}
      </PopoverPrimitive.Root>
    </Box>
  );
}

const StyledContent = styled(PopoverPrimitive.Content, {
  borderRadius: '$1',
  maxWidth: 265,
  '&:focus': {
    outline: 'none'
  }
});

export const PopoverContent = React.forwardRef(
  ({ children, hideArrow, ...props }, fowardedRef) => (
    <StyledContent sideOffset={0} {...props} ref={fowardedRef}>
      {children}
      {!hideArrow && (
        <Box css={{ color: '$sage3' }}>
          <PopoverPrimitive.Arrow
            width={11}
            height={5}
            offset={5}
            style={{ fill: 'currentColor' }}
          />
        </Box>
      )}
    </StyledContent>
  )
);
PopoverContent.displayName = 'PopoverContent';

export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverClose = PopoverPrimitive.Close;
