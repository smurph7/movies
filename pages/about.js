import * as React from 'react';
import NextLink from 'next/link';

import { Container, Flex, Text, Link } from '~/features/ui';
import { Layout, Metadata } from '~/features/common/components';

function TextLink({ href, children }) {
  return (
    <NextLink href={href} passHref>
      <Link variant="green" href={href}>
        {children}
      </Link>
    </NextLink>
  );
}

export default function About() {
  return (
    <>
      <Metadata
        title="About"
        description="Welcome to Movies! Search for information about all of your favourite movies."
      />
      <Layout>
        <Container
          size={{ '@bp1': 0, '@bp2': 2, '@bp3': 3, '@bp4': 4, '@bp5': 5 }}
          css={{ px: '$5' }}
        >
          <Flex direction="column" gap={5}>
            <Flex align="center" css={{ pt: '$5' }}>
              <Text as="h1" heading css={{ fontSize: '$6' }}>
                About Murphy's Movies
              </Text>
            </Flex>
            <Text css={{ lineHeight: 1.4 }}>
              This project uses the{' '}
              <TextLink href="https://www.themoviedb.org/">TMDB API</TextLink>{' '}
              but is not endorsed or certified by TMDB.
            </Text>
            <Text css={{ lineHeight: 1.4 }}>
              It was built with a focus on front-end development and utilisation
              of APIs, putting together some of the latest skills and libraries
              I've been learning over the past couple of years. I worked using
              Continuous Integration and Test Driven Development, which helped
              to design the components as I built them and to detect errors
              early.
            </Text>
            <Flex direction="column" gap={3}>
              <Text as="h2" heading>
                Planning
              </Text>
              <Text css={{ lineHeight: 1.4 }}>
                I drew up wireframes for this project based on components from
                other movie websites such as TMDB, IMDB and Netflix and worked
                with a Kanban board to plan &amp; organise tasks.
              </Text>
            </Flex>
            <Flex direction="column">
              <Text as="h2" heading>
                Overview of Tools
              </Text>
              <ul>
                <Flex direction="column" gap={3}>
                  <li>
                    <Text css={{ lineHeight: 1.4 }}>
                      Next.js - a framework which features hybrid static &amp;
                      server rendering and route pre-fetching with no config
                      needed.
                    </Text>
                  </li>
                  <li>
                    <Text css={{ lineHeight: 1.4 }}>
                      React Query - for data management, allowing the fetching,
                      synchronising, updating, and caching of remote data while
                      reducing the amount of code needed.
                    </Text>
                  </li>
                  <li>
                    <Text css={{ lineHeight: 1.4 }}>
                      React Testing Library - focuses on testing the application
                      components in the way the user would use them.
                    </Text>
                  </li>
                  <li>
                    <Text css={{ lineHeight: 1.4 }}>
                      Stitches - A lightweight, performant styling library that
                      supports cross-browser server-side rendering, including
                      for responsive styles and variants.
                    </Text>
                  </li>
                  <li>
                    <Text css={{ lineHeight: 1.4 }}>
                      Radix - a low-level UI component library with a focus on
                      accessibility and customisation used for the base layer of
                      my design system.
                    </Text>
                  </li>
                  <li>
                    <Text css={{ lineHeight: 1.4 }}>
                      Auth 0 - allows users to login with their email or
                      preferred social platform and save their preferences.
                    </Text>
                  </li>
                  <li>
                    <Text css={{ lineHeight: 1.4 }}>
                      Vercel - a platform that takes care of deploying instantly
                      and scaling automatically.
                    </Text>
                  </li>
                </Flex>
              </ul>
            </Flex>
            <Text css={{ lineHeight: 1.4 }}>
              View this project on{' '}
              <TextLink href="https://github.com/smurph7/movies">
                GitHub
              </TextLink>{' '}
              for more information or check out{' '}
              <TextLink href="https://sarahmurphy.dev">my portfolio</TextLink>{' '}
              to see more projects.
            </Text>
          </Flex>
        </Container>
      </Layout>
    </>
  );
}
