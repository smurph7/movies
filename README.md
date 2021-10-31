# About

This project uses the TMDB API to create a website where you can find trending and upcoming movies, search for a specific title, or find your favourites.

## Planning

- Drew wireframes based on components from other movie websites such as TMDB, IMDB and Netflix.

- Used a Kanban Board to create and organise tasks.

## How to navigate this project

- Uses domain driven design which advocates modeling based on relevant business use cases and helps to communicate the problem and design software with a common understanding of the solution.

- In this case - domains are grouped under the `/features` folder and each of these features contains its own core logic.

- UI components which serve as the basis for all other components can be found under `/features/ui`.

## Tools and Decisions

This project was built with a focus on front-end development and utilisation of APIs, putting together some of the latest skills and libraries I've been learning over the past couple of years.

### API

- This project uses the <a href="https://www.themoviedb.org/">TMDB API</a> but is not endorsed or certified by TMDB.

### Framework

- Uses the <a href="https://nextjs.org/">Next.js</a> framework which has features such as hybrid static & server rendering and route pre-fetching with no config needed.

- Statically generated pages can be cached to boost performance. The HTML is generated at build time and will be reused on each request: <a href='https://github.com/smurph7/movies/blob/main/pages/index.js'>Example code</a>.

- Incremental Static Regeneration enables the use of static generation on a per page basis, without needing to rebuild the entire site: <a href='https://github.com/smurph7/movies/blob/main/pages/movie/%5Bslug%5D.js'>Example code</a>.

### Tools

- <a href='https://react-query.tanstack.com/overview'>React-query</a>: Used for data management. It allows the fetching, synchronising, updating, and caching of remote data while reducing the amount of code needed.

- <a href='https://testing-library.com/docs/react-testing-library/intro/'>Testing Library</a>: Testing is an essential part of development. Testing library is the go-to library in the React community, as it focuses on testing the application components in the way the user would use them. I used Test Driven Development to help me design the components I was building.

- <a href='https://stitches.dev/docs/introduction'>Stitches</a>: A lightweight, performant styling library that supports cross-browser server-side rendering, including for responsive styles and variants, which works well with SSR on Next.js.

- <a href='https://www.radix-ui.com/docs/primitives/overview/introduction'>Radix</a>: Radix Primitives is a low-level UI component library with a focus on accessibility and customisation. I used these components as the base layer of my design system.

- <a href='https://auth0.com/'>Auth 0</a>: Used to authenticate users, allowing them to login with their email or preferred social platform and save their favourite movies to their profile.

- <a href='https://vercel.com/docs/concepts'>Vercel</a>: This project is deployed on Vercel, a platform for frontend frameworks and static sites. It takes care of deploying instantly and scaling automatically.

## Links

- Visit the website at https://murphys-movies.vercel.app

- View my portfolio at https://sarahmurphy.dev

## Available Scripts

In the project directory after cloning this project, you can run:

- `yarn` to install dependencies

- `yarn start` to run the app in development mode (then open http://localhost:3000)

- `yarn jest` to run the tests
