// Inspired by https://github.com/fullhdpixel/react-headless-pagination
import * as React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

import { Box, Flex, Text, Button } from '~/features/ui';
import { usePagination } from '~/features/common/hooks/use-pagination';

const defaultState = {
  currentPage: 0,
  setCurrentPage: () => {},
  truncatableText: '...',
  truncatableClassName: '',
  pages: [],
  hasPreviousPage: false,
  hasNextPage: false,
  previousPages: [],
  isPreviousTruncatable: false,
  middlePages: [],
  isNextTruncatable: false,
  nextPages: []
};

const PaginationContext = React.createContext(defaultState);

export function PrevButton({ className, children, ...buttonProps }) {
  const pagination = React.useContext(PaginationContext);

  function handlePrevious() {
    if (pagination.currentPage + 1 > 1) {
      pagination.setCurrentPage(pagination.currentPage - 1);
    }
  }

  return (
    <Button
      variant="round"
      {...buttonProps}
      onClick={handlePrevious}
      disabled={pagination.currentPage === 0}
    >
      {children ?? <ArrowLeftIcon />}
    </Button>
  );
}

export function NextButton({ className, children, ...buttonProps }) {
  const pagination = React.useContext(PaginationContext);

  function handleNext() {
    if (pagination.currentPage + 1 < pagination.pages.length) {
      pagination.setCurrentPage(pagination.currentPage + 1);
    }
  }

  return (
    <Button
      variant="round"
      {...buttonProps}
      onClick={handleNext}
      disabled={pagination.currentPage === pagination.pages.length - 1}
    >
      {children ?? <ArrowRightIcon />}
    </Button>
  );
}

export function TruncatableElement({ prev }) {
  const pagination = React.useContext(PaginationContext);

  const {
    isPreviousTruncatable,
    isNextTruncatable,
    truncatableText = '...'
  } = pagination;

  return (isPreviousTruncatable && prev === true) ||
    (isNextTruncatable && !prev) ? (
    <Text css={{ color: 'sage7' }}>{truncatableText}</Text>
  ) : null;
}

export function PageButton() {
  const pagination = React.useContext(PaginationContext);

  function renderPageButton(page) {
    const isActive = pagination.currentPage + 1 === page;
    return (
      <Button
        variant="round"
        key={page}
        css={{
          bg: isActive ? '$sage11' : 'sage1',
          color: isActive ? '$sage1' : 'sage7'
        }}
        onClick={() => pagination.setCurrentPage(page - 1)}
      >
        {page}
      </Button>
    );
  }

  return (
    <Flex gap={1}>
      {pagination.previousPages.map(renderPageButton)}
      <TruncatableElement prev />
      {pagination.middlePages.map(renderPageButton)}
      <TruncatableElement />
      {pagination.nextPages.map(renderPageButton)}
    </Flex>
  );
}

export function Pagination(paginationProps) {
  const { children } = paginationProps;
  const pagination = usePagination(paginationProps);

  return (
    <PaginationContext.Provider value={pagination}>
      <Box>{children}</Box>
    </PaginationContext.Provider>
  );
}

Pagination.PrevButton = PrevButton;
Pagination.NextButton = NextButton;
Pagination.PageButton = PageButton;
