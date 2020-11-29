# ALES Website

## Description

This project intends to serve as a new website for ALES organization. We have one already but it's a little old and now we have different requirements to attend.

## Project

The project has the following folder structure:

- `backend` - this is the folder with `Express.js` related folders and files
- `frontend` - this is the folder with `React` related folders and files
- `.env` - folder with environment variables to be defined (more on that later)
- `.vscode` - folder that contains `tasks.json` which has some VS Code tasks to be run
- `docker-compose.yml` - file that defines our docker services and allows us to start and stop these services in a very convenient way

## Tech Stack

It is strongly recommended that you have at least a basic knowledge of the main technologies used in this project. Those are:

#### [Git](https://git-scm.com/)

Git is the version control system used in this project. It is widely used on software industry and it's a _must know_ technology for software engineers nowadays.

#### [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

JavaScript is the main _programming language_ used on **web**. It is frequently changing to attend web application requirements. Its most used version is the `ES6`, launched on `2015`. It's recommended to learn this version or more recent ones.

#### [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

HTML is the markup language used on web. It is used indirectly with React library to create views and components.

#### [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

CSS (Cascading Style Sheet) is a stylesheet language used to apply styles to HTML elements. It is extensively used by Sass to style React views and components.

#### [React](https://reactjs.org/)

It's the main technology used in this project and defines itself as a JavaScript library for building user interfaces. It's very powerful and simple at the same time and it is maintained by Facebook. Spend some time with the documentation and some tutorials to grasp it well.

#### [Sass](https://sass-lang.com/)

Sass defines itself as CSS extension language. It adds some powerful features to CSS like variables, nested rules, functions and mixins. Don't worry if you don't know what those things are yet.

#### [Docker](https://docs.docker.com/)

Docker is a platform that allows applications to run on containers. In that way, application services can be decoupled making them able to be developed, tested and deployed separately. Another great advantage of running services on containers is that a container's environment is totally isolated, meaning that you can simulate locally all important environments of the development cycle of an application: `development`, `testing`, `stage` and `production`.

#### [Express](https://expressjs.com/)

Express is the most used backend framework for `Node.js` applications. It is very flexible and powerful and fits very well with `MongoDB`.

#### [MongoDB](https://www.mongodb.com/)

It defines itself as the most used database in modern applications. It fits very well with `Node.js` applications and is also very flexible as it is a NoSQL database.

## Design Decisions

**TL;DR** - ALES Website Design project can be accessed [here](https://www.figma.com/file/gVxe0hr8PU7uLFWkrlFDlA/Ales-Demo?node-id=0%3A1).

It is very recommended to check the visual design of views, components and user flows to understand a little more about how the application works, why it works on the way it works and how users will be using it.

All decisions related with user requirements and needs are made on the design process. This also helps to understand more about the application's business value.

## Running Locally

1. Have [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed in your machine

2. Clone the repository

3. Create a `.env` folder in the root level.

4. Inside the `.env` folder, create a `dev` folder and then add the following files with their respective content:

- `db.env`

  - MONGO_INITDB_ROOT_USERNAME={username}
  - MONGO_INITDB_ROOT_PASSWORD={password}

- `db-admin.env`

  - ME_CONFIG_MONGODB_ADMINUSERNAME={admin_username}
  - ME_CONFIG_MONGODB_ADMINPASSWORD={admin_username}
  - MONGO_INITDB_DATABASE={db_name}

- `app.env`

  - MONGO_INITDB_ROOT_USERNAME={username}
  - MONGO_INITDB_ROOT_PASSWORD={username}

  - MONGO_DATABASE={database_name}
  - MONGO_HOSTNAME=db

  - TOKEN_SECRET={token-secret}
  - REFRESH_TOKEN_SECRET={refresh-token-secret}

  - INIT_USER=alessauro
  - INIT_PASSWORD=admin
  - INIT_EMAIL=alessauro@mail

  - EMAIL_HOST={email-host}
  - EMAIL_PORT={email-port}
  - EMAIL_FROM={email-from}
  - EMAIL_USER={email-user}
  - EMAIL_PASSWORD={email-password}

  - PORT={port}
  - UI_URL={ui_url}
  - DOMAIN={domain}

  > The email related variables are only necessary if you pretend to use emails in your development flow

  > EMAIL_HOST, EMAIL_PORT, EMAIL_USER and EMAIL_PASSWORD can all be [Mail Trap](https://mailtrap.io/) configuration. Just create an account if you don't have one yet (used just in development).

  > TOKEN_SECRET and REFRESH_TOKEN_SECRET can be generated by running `require('crypto').randomBytes(64).toString('hex')` in Node

- `ui.env`

  - REACT_APP_API_URL={api-url}

5. Build services images by running `docker-compose build` or running `dev build` VS Code task.

6. Start services by running `docker-compose up` or running `dev start` VS Code task.

> Add `-d` flag to run it in background

7. If everything works as expected, all services should be running for now. Open your browser in `localhost:3000` to see the `UI`. The `API` service should be running on port `8000`.

## How Can I Contribute?

### Tools

Here we list some important tools that will provide all you need to start your contributing journey.

#### [Visual Studio Code](https://code.visualstudio.com/)

It is the most used and most powerful text editor (very lightweight though) nowadays. You can use other text editors if you want, but we strongly recommend `VS Code`. We list below some useful `VS Code` **extensions** to improve your productivity even more.

##### Git

- Git Graph
- Git Lens

##### Code Linting

- Visual Studio IntelliCode
- ES Lint
- Prettier
- Auto Close Tag
- Bracket Pair Colorizer

##### Tools

- Docker

#### [Git Bash](https://gitforwindows.org/)

> Note: Windows only

It simulates Unix system's `bash` on Windows. Useful if you are used to run `Unix` commands on `Linux` or `MacOS`.

#### [Google Chrome](https://www.google.com/chrome/)

It's the most used browser for development and test. It has a lot of helpful extensions. `Mozilla Firefox` is also a great option.

#### [Docker](https://docs.docker.com/install/)

As it was said, it's very useful if you don't want to install a lot of dependencies on your machine and want to simulate different environments of the application.

### Styleguides

#### JavaScript

The project uses `React` as main library for the frontend, thus they use `JavaScript` as main programming language. `JavaScript` has many code styles that could be followed, most of them were created in big companies like Google and Airbnb. We will be using `Airbnb`'s code style.

But before you search for it (which we suggest you to do), know that we use some built-in configurations that allow us to write `Airbnb`'s code style automatically. It should come already configured in the project (`.vscode/settings.json` file).

Despite all of that, it is recommended to spend some time (not much) checking [Airbnb's code style](https://github.com/airbnb/javascript).

### First Commit

Finally this moment has come \o/

Now you should be ready to start coding. In this section we show a very simple example of what would be your first commit. It's a simple code change that sets `browser window`'s name to `My First Commit`.

1. So first open the project on `VS Code`.

2. Check what `branch` you are in. If you just cloned the repository then it should be the `master` branch.

3. Make sure that your local `master` branch is up to date with the remote branch:

```
git pull
```

4. Now create a new branch and checkout to it:

```
git checkout -b ref/change-browser-window-name
```

> `-b` flag allows you to create and checkout to a branch in the same command

5. Now in this example we open `frontend/public/index.html` file and change the content of `<title>` tag to `<title>My first commit</title>`

6. After that, your code change can be committed. To do that, enter:

```
git add .
```

to add all changes (in this case just one) to _staging_ state.

7. Then enter:

```
git commit -m "ref: change browser window name in my first commit"
```

8. Now you push this commit to Gitlab:

```
git push --set-upstream origin ref/change-browser-window-name
```

> Note: if you already pushed the branch in another moment, then just enter `git push`

### First Pull Request

After 1 or more commits (depending on your task), if you feel that you achieved all the requirements of the given task then it's time to open a `Pull Request`. This is a request to merge your branch (with all your changes) with `master` branch.

To open you first `PR`, follow these next steps:

1. Open repository's page on `GitHub`

2. Click on `Pull Requests` tab.

3. This page will show you all `PR` that are open at the moment. To create a new one, click on `New pull request` button.

4. Now choose the `source` and `target` branches. The `source` branch is your branch (`ref/change-browser-window-name` in this example) and the `target` branch should be the `master` branch.

5. Don't forget to notify other team members to test and review your `PR`. You can send `PR`'s link or configure a GitHub integration on Slack to notify them automatically.
