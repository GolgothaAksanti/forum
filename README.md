[![Maintainability](https://api.codeclimate.com/v1/badges/e10f329caffda5aac473/maintainability)](https://codeclimate.com/github/GolgothaAksanti/forum/maintainability) [![Coverage Status](https://coveralls.io/repos/github/GolgothaAksanti/forum/badge.svg?branch=develop)](https://coveralls.io/github/GolgothaAksanti/forum?branch=develop) [![Build Status](https://travis-ci.org/GolgothaAksanti/forum.svg?branch=develop)](https://travis-ci.org/GolgothaAksanti/forum)

---

# Forum

Forum is nodejs express backend project that allow user to sign up and sign in so they can perform the ###CRUD operations.

---

## Getting Started

---

Follow these instructions to run the project on your local machine.

##### Prerequesites

Make sure you have node -v 10 and above installed or follow this link to install it
:point_right: [Install Nodejs](https://nodejs.dev/learn/how-to-install-nodejs)

---

##### Clone the Project from Github

These are steps to clone the repository

> 1. open your terminal (`cmd`, `git bash` or whatever you have ).
> 2. Dive into the location you want to put your local repository.
> 3. Then run this command :point_down:
>    `$ git clone https://github.com/GolgothaAksanti/forum.git`

---

##### Install the required dependencies found in `package.json` file

> Install all dependencies so you can run the project
> `$ npm install`

---

##### Set env variables

> Create a `.env` file where you are going to set all environment variables from a `.env.sample` file in the root

---

### Running the app for development environment

> ##### Create database for Development
>
> Make sure your `.env` variables are well set then run this command
> :point_right: `$ npm run db:create`

---

> ##### Create Migrations and Models(Tables) for Development
>
> :warning: Run this command after creating the database
> :point_right: `$ npm run db:migrate`

---

> ##### Delete the database for Development
>
> :warning: You don't have to run this command but just in case you want to delete your database
> :point_right: `$ npm run db:drop`

---

> ##### Run the Server
>
> After Installing dependencies, creating database and migrating models(tables) you can now run the server safely by typing this command
> :point_right: `$ npm run dev`

### Running the app for Test environment

> ##### Create database for Test
>
> Make sure your `.env` variables are well set then run this command
> :point_right: `$ npm run db:create:test`

---

> ##### Create Migrations and Models(Tables) for Test
>
> :warning: Run this command after creating the database
> :point_right: `$ npm run db:migrate:test`

---

> ##### Delete the database for Test
>
> :warning: You don't have to run this command but just in case you want to delete your database
> :point_right: `$ npm run db:drop:test`

---

> ##### Run the tests
>
> creating database and migrating models(tables) for test, you can now run the test by typing this command
> :point_right: `$ npm test`

---

> ##### Collect the coverage report
>
> You can collect the coverage report by typing this command
> :point_right: `$ npm run coverage`

---

> ##### Testing the code style with `eslint`
>You can type this command :point_down: to test the code style with `eslint`
`$ npm run lint`
and fix your code style with eslint by typing this command
:point_right: `$ npm run lint:fix`

---
>##### Build the project with babel
>This project is using advanced javascript (es5 and above version) for transpiling it you have to build it so it can be faster
to do so you have to run the command below :point_down: 
>
>`$ npm run build`
then :point_down: 
`$ npm start`

---
##### Project structure tree

```
- src
    - app
        - controllers
            - blogControllers.js
            - userController.js
        - helpers
            - extractToken.js
            - jwtHelper.js
            - responseHandler.js
            - userChema.js
            - utils.js
        - middlewares
            - asyncHandler.js
            - validator.js
        - routes
            - auth
                -index.js
            - blog
                - index.js
        - app.js
    - database
        - config
            - config.js
        - migrations
            - user-migration.js
            - blog-migration.js
        - models
            - user.js
            - blog.js
            - index.js
        - services
            - userService.js
            - blogService.js
    - extends
        - mocks
            - dummyData.js
            - variables.js
        - tests
            - core.test.js
            - user.test.js
            - blog.test.js
    - server.js
```
---
##### User Endpoints: /api/v1
| Method | Endpoint      | Public | Action|
|:--------:|:--:|:--------:|------|-------|
| POST |/auth/signup|True  | User signup|
|POST|/auth/signin| True| User signin|

---
##### Blog Endpoints: /api/v1
|Method | Endpoint | Public | Action|
|-------|:----------|--------| ------|
|POST|/blog/posts|False | Create a blog|
|GET| /blog/posts|True| Get all blogs|
|GET | /blog/posts/:post_id| True|Get a single blog|
|PUT|/blog/posts/:post_id|False| Update blog|
|DELETE|/blog/posts/:post_id| False| Delete blog|

---