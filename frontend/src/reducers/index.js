//All the reducers that I have used are mentioned in this file

const Redux = require('redux');

module.exports = Redux.combineReducers({
  notebooks: require('./notebooks'),
  //notes: require('./notes'),
});
