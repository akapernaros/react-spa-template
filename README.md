# react-spa-template
This is a template for react single-page applications. It contains all aspects needed for creating an app 
without "starting from scratch".

This template integrates the following libraries/aspects:
* i18n using `react-i18next`
* Style/css, layout using `bootstrap`
* components using `react-bootstrap` (wrapped in shared components)  
* ... and more to come.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

#i18next
Project uses i18next(https://www.i18next.com/), and the corresponding React implementation (https://react.i18next.com/). 
i18n in react is really tortuous. However, after evaluating other frameworks I decided to use i18next.  

I decided to integrate translations files into the build not loading them dynamically from /public/locales. So no use of `i18next-http-backen` module

#Bootstrap
Like most apps and frameworks this one does not start from scratch. It uses `bootstrap-css` for layout and styling. 
The bootstrap-components `react-bootstrap` are wrapped as widgets to decouple them from the app-components. The shared 
widget component also define a choice of "common styling" and functionality.

#Next to come
* Support for Backend communication (Axios?)
* Security using OpenID Connect (Authentication)
* Authorisation, securing functions
* Add more wid  