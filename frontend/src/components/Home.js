/**
 * This file contains the Home component.
 * Other React components for viewing notes and notebooks should be nested
 * beneath the Home component.
 */

const React = require('react');

const NotebookList = require('./NotebookList');

//We start building the frontend from here
//We call the NotebookList which further calls other requried components
const Home = () => (
  <div className="container">
    <h1>Neverwrote</h1>
    <blockquote>
      Never say "I never wrote that down" ever again!
    </blockquote>
    <NotebookList />
  </div>
);

//We export our Home Component
module.exports = Home;
