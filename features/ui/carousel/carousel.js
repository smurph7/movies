import * as React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { createContext } from '@radix-ui/react-context';
import { useDebouncedCallback } from 'use-debounce';

import { Box, Button, Flex } from '~/features/ui';

export function StyledCarousel({ children, ...props }) {
  return (
    <Carousel css={{ position: 'relative' }}>
      <CarouselSlideList
        css={{
          overflowX: 'auto',
          overflowY: 'hidden',
          paddingY: '$1',
          WebkitoverflowScrolling: 'touch',
          MsOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}
      >
        <Flex gap={1} css={{ pt: '$2', ...props }}>
          {children?.map((slide, index) => (
            <CarouselSlide key={slide?.key ?? index}>{slide}</CarouselSlide>
          ))}
        </Flex>
      </CarouselSlideList>
      <Box
        css={{
          position: 'absolute',
          top: '50%',
          left: '15px',
          transform: 'translateY(-50%)'
        }}
      >
        <CarouselPrevious>
          <ArrowLeftIcon />
        </CarouselPrevious>
      </Box>
      <Box
        css={{
          position: 'absolute',
          top: '50%',
          right: '15px',
          transform: 'translateY(-50%)'
        }}
      >
        <CarouselNext>
          <ArrowRightIcon />
        </CarouselNext>
      </Box>
    </Carousel>
  );
}

const [CarouselProvider, useCarouselContext] = createContext('Carousel');

function Carousel({ children, ...carouselProps }) {
  const ref = React.useRef(null);
  const slideListRef = React.useRef(null);
  const [force, setForce] = React.useState({});

  const getSlideInDirection = useCallbackRef(direction => {
    const slides = ref.current.querySelectorAll('[data-slide-intersected]');
    return Array.from(slides.values()).find((slide, index) => {
      const slideBefore = slides.item(index - direction);
      return (
        slide.dataset.slideIntersected === 'false' &&
        slideBefore?.dataset.slideIntersected === 'true'
      );
    });
  });

  const handleNextClick = React.useCallback(() => {
    const nextSlide = getSlideInDirection(1);
    if (nextSlide) {
      nextSlide.scrollIntoView({
        inline: 'start',
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [getSlideInDirection]);

  const handlePrevClick = React.useCallback(() => {
    const prevSlide = getSlideInDirection(-1);
    if (prevSlide) {
      prevSlide.scrollIntoView({
        inline: 'end',
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [getSlideInDirection]);

  const handleScrollStartAndEnd = useDebouncedCallback(
    () => setForce({}),
    100,
    {
      leading: true,
      trailing: true
    }
  );

  React.useEffect(() => {
    const slidesList = slideListRef.current;
    slidesList.addEventListener('scroll', handleScrollStartAndEnd);
    setForce({});
    return () =>
      slidesList.removeEventListener('scroll', handleScrollStartAndEnd);
  }, [handleScrollStartAndEnd, slideListRef]);

  return (
    <CarouselProvider
      force={force}
      slideListRef={slideListRef}
      onNextClick={handleNextClick}
      onPrevClick={handlePrevClick}
    >
      <Box {...carouselProps} ref={ref}>
        {children}
      </Box>
    </CarouselProvider>
  );
}

function CarouselSlideList({ ...props }) {
  const context = useCarouselContext('CarouselSlideList');
  const ref = React.useRef(null);
  const composedRefs = useComposedRefs(ref, context.slideListRef);

  return <Box {...props} ref={composedRefs} />;
}

function CarouselSlide({ ...slideProps }) {
  const context = useCarouselContext('CarouselSlide');
  const ref = React.useRef(null);
  const [isIntersected, setIsIntersected] = React.useState(false);
  const isDraggingRef = React.useRef(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersected(entry.isIntersecting),
      {
        root: context.slideListRef.current,
        threshold: 1
      }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [context.slideListRef]);

  return (
    <Box
      {...slideProps}
      ref={ref}
      data-slide-intersected={isIntersected}
      onDragStart={event => {
        event.preventDefault();
        isDraggingRef.current = true;
      }}
      onClick={event => {
        if (isDraggingRef.current) {
          event.preventDefault();
        }
      }}
    />
  );
}

function CarouselNext({ ...nextProps }) {
  const context = useCarouselContext('CarouselNext');
  const slideList = context.slideListRef.current || {};
  const { scrollWidth, scrollLeft, clientWidth } = slideList;
  const remainder = scrollWidth - scrollLeft - clientWidth;
  const disabled = remainder <= 0;

  return (
    <Button
      {...nextProps}
      css={{
        p: '$3',
        width: '$7',
        height: '$7',
        borderRadius: '$round',
        willChange: 'transform',
        transition: 'all 100ms ease',
        '@media (hover: none) and (pointer: coarse)': {
          display: 'none'
        },
        '&:disabled': {
          opacity: 0
        }
      }}
      tabIndex={-1}
      onClick={() => context.onNextClick()}
      disabled={disabled}
    />
  );
}

function CarouselPrevious({ ...prevProps }) {
  const context = useCarouselContext('CarouselPrevious');
  const slideList = context.slideListRef.current || {};
  const disabled = slideList?.scrollLeft <= 0;

  return (
    <Button
      {...prevProps}
      css={{
        p: '$3',
        width: '$7',
        height: '$7',
        borderRadius: '$round',
        willChange: 'transform',
        transition: 'all 100ms ease',
        '@media (hover: none) and (pointer: coarse)': {
          display: 'none'
        },
        '&:disabled': {
          opacity: 0
        }
      }}
      tabIndex={-1}
      onClick={() => context.onPrevClick()}
      disabled={disabled}
    />
  );
}
