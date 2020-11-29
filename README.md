# react-spa-template
This is a template for react single-page applications. It contains all aspects needed for creating an app 
without "starting from scratch". It is my first react experience, so I just tried out a few things.  

This template integrates the following libraries/aspects:
* i18n using `react-i18next`
* Style/css, layout using `bootstrap`
* components using `react-bootstrap` (wrapped in shared components, see kitchen-sink)
* axios for implementing a connection to REST-APIs
* Loading a configuration from /public (dynamic config)
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

## Kitchen-Sink
As mentioned before that is my first contact with react and tried out a few things, just to see how react works and 
experimenting how it "feels".

`shared/components` contains a library of Widgets. It encapsulates the react-bootstrap components and adds styling for 
them in one place utilizing the bootstrap css. It may not always making sense (e.g. Button), but ... just trying things out.

Import all components by `import { Widget } from "./shared/components";` or the ones needed `import { WButton } from "./wdg.button";`.

- __ExpandableSection__ is a section that expands by clicking on the top left button, showing or hiding the contents in the sections body. 
The expansion state can be set using `expanded={ true }`. The component manages the state change using the toggle button internally. 

- __List__ is a component that iterates through an array of elements and creates instances of the specified "content-component". Each
element in the array represents an own list-element with a specified key.

## i18next
Project uses i18next(https://www.i18next.com/), and the corresponding React implementation (https://react.i18next.com/). 
i18n in react is really tortuous. However, after evaluating other frameworks i18next appeared to be the best one.  

I decided to integrate translations files into the build not loading them dynamically from /public/locales. So no use of `i18next-http-backen` module

## Bootstrap
Like most apps and frameworks this one does not start from scratch. It uses `bootstrap-css` for layout and styling. 
The bootstrap-components `react-bootstrap` are wrapped as widgets to decouple them from the app-components. The shared 
widget component also define a choice of "common styling" and functionality.

## Messageing and Errorhandling


## Next to come
* More Backend communication with Axios (how handle request in a common way and hide axios specific details)
* Security using OpenID Connect (Authentication)
* Authorisation, securing functions
* Add more widgets 
