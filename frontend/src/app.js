/**
 * In this file the Express application is created. All of the frontend routes
 * are defined in this file:
 *   - /assets: All static assets, including the bundled scripts and styles,
 *              are made available from here.
 *   - /      : The index route serves the web application itself.
 *
 * Note that '/api' also exists, but that route is handled by NGINX and
 * redirects to the backend application.
 */
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Root = React.createFactory(require('./components/Root'));
const path = require('path');
const express = require('express');
const Youch = require('youch');
const api = require('./helpers/api');
const createStore = require('./helpers/createStore');

// Create a new Express app
const app = express();

// Serve up our static assets from 'dist/'
app.use('/assets', express.static(path.join(__dirname, '..', 'dist')));

// Serve up font-awesome fonts from vendor folder
app.use('/assets/font-awesome/fonts', express.static(
  path.dirname(require.resolve('font-awesome/fonts/FontAwesome.otf'))));

const combinedReducers = require('./reducers');

// Set up the index route
app.get('/', (req, res) => {

  api.get('/notebooks').then((notebooks) => {

    const initialState = combinedReducers();
    initialState.notebooks.notebooks = notebooks;
    const initialStateString = JSON.stringify(initialState).replace(/<\//g,"<\\/");
    console.log('test wjarjgfsagraeg'+initialStateString);

    //Create the Redux store
    const store = createStore(initialState);
    //Create the root React component
    const rootComponent = Root({store});
    //render the root component to a HTM: string
    const reactHtml = ReactDOMServer.renderToString(rootComponent);

     const htmlDocument = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Neverwrote</title>
        <link rel="stylesheet" type="text/css" href="/assets/css/app.css">
        <script src="/assets/js/vendor.js"></script>
        <script src="/assets/js/app.js"></script>
      </head>
      <body>
        <div class="container" id="root">${reactHtml}</div>
        <script>window.main(${initialStateString});</script>
      </body>
    </html>`;

  // Respond with the complete HTML page
  res.send(htmlDocument);

  });


});

// Catch-all for handling errors.
app.use((err, req, res, next) => {
  console.error(err.stack);
  if(res.headersSent) {
    return next(err);
  }
  const youch = new Youch(err, req);
  youch.toHTML().then(html => res.send(html));
});

module.exports = app;