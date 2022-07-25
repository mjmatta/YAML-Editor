# MassMutual Shredding UI

## Brief overview

A simple React application designed to edit YAML configuration files from MassMutual's mozzarella command line tool.

Shredding is the process of taking a complex, nested JSON or similar formatted documents and converting it into a relational format to be stored in a database engine.

## Technical architecture
Made using [Create-React-App](https://create-react-app.dev/). Uses [npm](https://www.npmjs.com/) for dependencies.

## How to run locally

1. Since this project is built purely in React.js, you need install the npm package manager in order to deploy the application locally. To install npm:
    1. For Mac: 
        1. First install Homebrew by running in Terminal: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
        2. Install node by running `brew install node`
    2. For Windows: Go to https://nodejs.org/en/download/ and follow the instructions there.

2. Once you have npm installed, clone the repo onto your own machine:
    1. Go to https://github.com/BU-Spark/se-mm-shredding-ui/
    2. Clone it onto your local machine by running `git clone https://github.com/BU-Spark/se-mm-shredding-ui.git` in your directory of choice.

3. In your project directory, run `git checkout dev` to use our dev branch

4. Install the necessary node modules dependencies using the command: `npm install`

5. To run the code, run `npm start` from your project directory.

6. To see the running application on the browser, go to http://localhost:3000/

## Continuous deployment
Hosted on our [website](http://shreddingui.herokuapp.com/). Deployed on push via [GitHub Actions script](.github/workflows/main.yml). Heroku single-page static server configured through [create-react-app buildpack](https://github.com/mars/create-react-app-buildpack).

## Bugs and issues
No known bugs nor issues. If you find any problems with the code, create an Github issue.
