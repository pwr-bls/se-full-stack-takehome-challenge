# Secret Escapes Full stack engineer take home task

This project is a starting point for the fullstack engineer technical interview take home task.
It consists of a Frontend (with some functionality already build) and a backend application (to be created by you).

## Frontend application

The frontend application is build using Create react app and is a simple react app using typescript.

### Prerequisites

- Node (version 14+)
- Yarn (modern version)

### To install dependencies

From the `frontend-application` directory and `yarn`

### To start the application

From the `frontend-application` directory run `yarn start`

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Project overview

- `.env` contains URL for Sparrow graphql API
- `index.tsx` is where the application is set up, including the configuration of Apollo client
- `App.tsx` is the root of the application, and where URL routing is configured
- `UserContext` is set up in `App`, this means you can access the user ID in any component via this context
- `pages` directory contains the top-level components which form the contents of each page
- `components` directory contains other reusable components
- `layout` contains the main layout for the page including menu bar
- `utils` contains helper functions to perform data fetching

## Backend application

The `backend-application` directory is a placeholder for your new microservice. Please update this section of the read me with instructions on how to run the service.

I create two microservices:
 - one connected with authorization by GoogleOAuth auth-service - you need to use in FE app component LoginButtonByGoogle
 - second connected with save favourites sale for specific user -> this microservices work with using text file

### auth-service

#### To install dependencies

Go the `backend-application/auth-service` directory and `yarn`

#### To start service
From the `backend-application/auth-service` directory run `yarn start`
Serivce works on port 5001

### data-service

#### To install dependencies

Go the `backend-application/data-service` directory and `yarn`

#### To start service
From the `backend-application/data-service` directory run `yarn start`
Serivce works on port 5002


## Implementation Comments

Please add any comments on choices you have made, any missed functionally or known bugs and what you would improve or do differently given more time if you were to make this solution production-ready.

- I wrote authorizations using googleOAuth unnecessarily, but I learn something new :)
  if you would try it please change LoginButton to LoginButtonByGoogle into FE part and   remember that you need run also auth-service
- When user remove favourite sale there is query refresh, and we have blinking this should not happen
- no unit tests and no typescript for microservices sorry :(
- I could use docker to run whole app by one commend
- I should split UseSearch and UseFavouriteSearch to separate files also models/interfaces should be moved to separate file as ... Search.interface.ts?

### To production ready

- imho we should write favourites functionality with GraphQL query => I saw queries to do that :) 
- if about my solution and my microservices access should be granted by access token not by pass in props userID
- user should be recognized by access token -> I pass userID
- favourite route should be protected, and we should have redirection if it's not accessible
