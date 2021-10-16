import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { styled, css } from '../../../stitches.config';

export const baseItemCss = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontFamily: '$body',
  fontSize: '$2',
  fontVariantNumeric: 'tabular-nums',
  lineHeight: '1',
  cursor: 'pointer',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  height: '$5',
  px: '$5'
});

export const itemCss = css(baseItemCss, {
  position: 'relative',
  color: '$sage11',
  fontFamily: '$body',

  '&:focus': {
    outline: 'none',
    backgroundColor: '$sage5'
  },

  '&[data-disabled]': {
    color: '$sage9'
  },

  variants: {
    variant: {
      mobile: {
        height: 60
      }
    }
  }
});

export const labelCss = css(baseItemCss, {
  color: '$sage11'
});

export const menuCss = css({
  bg: '$sage2',
  boxSizing: 'border-box',
  minWidth: 150,
  py: '$1',

  variants: {
    variant: {
      mobile: {
        position: 'absolute',
        '@bp1': { width: 280 },
        '@bp2': { width: 400 }
      }
    }
  }
});

export const separatorCss = css({
  height: 1,
  my: '$1',
  backgroundColor: '$sage6'
});

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = styled(
  DropdownMenuPrimitive.Content,
  menuCss
);
export const DropdownMenuSeparator = styled(
  DropdownMenuPrimitive.Separator,
  separatorCss
);
export const DropdownMenuItem = styled(DropdownMenuPrimitive.Item, itemCss);
export const DropdownMenuLabel = styled(DropdownMenuPrimitive.Label, labelCss);
export const DropdownMenuGroup = styled(DropdownMenuPrimitive.Group, {});
