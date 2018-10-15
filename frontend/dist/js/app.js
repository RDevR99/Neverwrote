(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

/**
 * This is the entry point for the JavaScript application which runs in the
 * web browser. We call `window.main` when the page loads, and use that
 * opportunity to create the Redux store and mount the root React component.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var createStore = require('./helpers/createStore');
var Root = React.createFactory(require('./components/Root'));

// Initialisation function which we will call on page load
window.main = function (initialState) {
  // Create root React component with Redux store
  var store = createStore(initialState);
  var rootComponent = Root({ store: store });

  // Mount React root component in DOM
  var mountPoint = document.getElementById('root');
  ReactDOM.render(rootComponent, mountPoint);
};

},{"./components/Root":10,"./helpers/createStore":14,"react":"react","react-dom":"react-dom"}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReduxDevtools = require('redux-devtools');
var DockMonitor = require('redux-devtools-dock-monitor').default;
var LogMonitor = require('redux-devtools-log-monitor').default;

var InternalDevTools = ReduxDevtools.createDevTools(React.createElement(
  DockMonitor,
  { toggleVisibilityKey: 'h', changePositionKey: 'q', defaultIsVisible: false },
  React.createElement(LogMonitor, null)
));

var DevTools = function (_React$Component) {
  _inherits(DevTools, _React$Component);

  function DevTools(props) {
    _classCallCheck(this, DevTools);

    var _this = _possibleConstructorReturn(this, (DevTools.__proto__ || Object.getPrototypeOf(DevTools)).call(this, props));

    _this.state = { isMounted: false };
    return _this;
  }

  _createClass(DevTools, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ isMounted: true });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.state.isMounted && React.createElement(InternalDevTools, null)
      );
    }
  }], [{
    key: 'instrument',
    value: function instrument() {
      return InternalDevTools.instrument.apply(InternalDevTools, arguments);
    }
  }]);

  return DevTools;
}(React.Component);

/**
 * Redux development tools (useful for debugging).
 */


module.exports = DevTools;

},{"react":"react","redux-devtools":"redux-devtools","redux-devtools-dock-monitor":"redux-devtools-dock-monitor","redux-devtools-log-monitor":"redux-devtools-log-monitor"}],3:[function(require,module,exports){
'use strict';

/**
 * This file contains the Home component.
 * Other React components for viewing notes and notebooks should be nested
 * beneath the Home component.
 */

var React = require('react');

var NotebookList = require('./NotebookList');

//We start building the frontend from here
//We call the NotebookList which further calls other requried components
var Home = function Home() {
  return React.createElement(
    'div',
    { className: 'container' },
    React.createElement(
      'h1',
      null,
      'Neverwrote'
    ),
    React.createElement(
      'blockquote',
      null,
      'Never say "I never wrote that down" ever again!'
    ),
    React.createElement(NotebookList, null)
  );
};

//We export our Home Component
module.exports = Home;

},{"./NotebookList":8,"react":"react"}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

//This is the MarkDownEditor

var MarkdownEditor = function (_React$Component) {
  _inherits(MarkdownEditor, _React$Component);

  function MarkdownEditor() {
    _classCallCheck(this, MarkdownEditor);

    return _possibleConstructorReturn(this, (MarkdownEditor.__proto__ || Object.getPrototypeOf(MarkdownEditor)).apply(this, arguments));
  }

  _createClass(MarkdownEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // SimpleMDE must be required here since it's browser-only.
      var SimpleMDE = require('simplemde');

      // Turn our plain old text area into a beautiful markdown editor
      this.simpleMDE = new SimpleMDE({
        indentWithTabs: false,
        status: false,
        autoDownloadFontAwesome: false,
        element: this.textarea
      });

      // Put initial text in the editor
      this.simpleMDE.value(this.props.value);

      // Listen for changes and fire a callback
      this.simpleMDE.codemirror.on('change', function () {
        var newText = _this2.simpleMDE.value();
        if (newText !== _this2.props.value) {
          _this2.props.onChange({ target: { value: newText } });
        }
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // Replace the text in the editor, preserving the cursor position and
      // selection info
      var selections = this.simpleMDE.codemirror.listSelections();
      this.simpleMDE.value(this.props.value);
      this.simpleMDE.codemirror.setSelections(selections);
    }

    // Describe how to render the component

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var ref = function ref(element) {
        _this3.textarea = element;
      };
      return React.createElement('textarea', { ref: ref });
    }
  }]);

  return MarkdownEditor;
}(React.Component);

// Export the component so that it can be required


module.exports = MarkdownEditor;

},{"react":"react","simplemde":"simplemde"}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var _ = require('lodash');
var MarkdownEditor = require('./MarkdownEditor');

var NoteEdit = function (_React$Component) {
  _inherits(NoteEdit, _React$Component);

  function NoteEdit(props) {
    _classCallCheck(this, NoteEdit);

    var _this = _possibleConstructorReturn(this, (NoteEdit.__proto__ || Object.getPrototypeOf(NoteEdit)).call(this, props));

    var note = props.note || {};

    _this.state = {
      title: note.title || '',
      content: note.content || '',
      notebookId: props.notebookId || ''
    };
    return _this;
  }

  _createClass(NoteEdit, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var revertAndStopEditing = function revertAndStopEditing(event) {
        event.preventDefault();
        _this2.props.onCancel();
      };

      var submitAndStopEditing = function submitAndStopEditing(event) {
        event.preventDefault();
        var editedPost = _.assign({}, _this2.props.note, {
          title: _this2.state.title,
          content: _this2.state.content,
          notebookId: _this2.props.notebookId
        });

        console.log('edited post');
        console.table(editedPost);
        _this2.props.onSave(editedPost);
        _this2.props.onCancel();
      };

      var onTitleChange = function onTitleChange(event) {
        _this2.setState({ title: event.target.value });
      };

      var onContentChange = function onContentChange(event) {
        _this2.setState({ content: event.target.value });
      };

      return React.createElement(
        'form',
        { className: 'blog-post' },
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement('input', { className: 'form-control input-lg', value: this.state.title,
            placeholder: 'Note title', onChange: onTitleChange
          }),
          React.createElement(MarkdownEditor, { value: this.state.content, onChange: onContentChange })
        ),
        React.createElement(
          'button',
          { className: 'ButnN btn btn-danger pull-right btn-lg',
            style: { marginRight: '12px' },
            onClick: revertAndStopEditing
          },
          React.createElement('i', { className: 'fa fa-remove' })
        ),
        React.createElement(
          'button',
          { className: 'ButnN btn btn-success pull-right btn-lg',
            onClick: submitAndStopEditing
          },
          React.createElement('i', { className: 'fa fa-check' })
        )
      );
    }
  }]);

  return NoteEdit;
}(React.Component);

module.exports = NoteEdit;

},{"./MarkdownEditor":4,"lodash":"lodash","react":"react"}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var MarkdownEditor = require('./MarkdownEditor');
var NoteEdit = require('./NoteEdit');

var NoteNew = function (_React$Component) {
  _inherits(NoteNew, _React$Component);

  function NoteNew(props) {
    _classCallCheck(this, NoteNew);

    var _this = _possibleConstructorReturn(this, (NoteNew.__proto__ || Object.getPrototypeOf(NoteNew)).call(this, props));

    _this.state = {
      editing: false

    };
    return _this;
  }

  _createClass(NoteNew, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var openEdit = function openEdit() {
        _this2.setState({ editing: true });
      };

      var closeEdit = function closeEdit() {
        _this2.setState({ editing: false });
        console.log('Calling...');
        _this2.props.clearInput();
      };

      var createNote = function createNote(newNote) {
        _this2.props.createNote(newNote, function (err) {
          if (!err) closeEdit();
        });
        console.log('this is supposed to show up after the first table');
      };

      if (this.state.editing) {

        return React.createElement(NoteEdit, {
          note: this.props.note,
          onSave: createNote,
          onCancel: closeEdit,
          notebookId: this.props.notebookId
        });
      }

      return React.createElement(
        'button',
        { className: 'new-note btn btn-primary',
          onClick: openEdit
        },
        React.createElement('i', { className: 'new-notebook-button-plus fa fa-plus' }),
        'Note'
      );
    }
  }]);

  return NoteNew;
}(React.Component);

module.exports = NoteNew;

},{"./MarkdownEditor":4,"./NoteEdit":5,"react":"react"}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var _ = require('lodash');

var NotebookEdit = function (_React$Component) {
  _inherits(NotebookEdit, _React$Component);

  function NotebookEdit(props) {
    _classCallCheck(this, NotebookEdit);

    var _this = _possibleConstructorReturn(this, (NotebookEdit.__proto__ || Object.getPrototypeOf(NotebookEdit)).call(this, props));

    var notebook = props.notebook || {};
    _this.state = {
      title: notebook.title || ''
    };
    return _this;
  }

  _createClass(NotebookEdit, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var revertAndStopEditing = function revertAndStopEditing(event) {
        event.preventDefault();
        _this2.props.onCancel();
      };

      var submitAndStopEditing = function submitAndStopEditing(event) {

        event.preventDefault();
        //Creates a new Notebook object and saves it.
        var editedNotebook = _.assign({}, _this2.props.notebook, {
          title: _this2.state.title
        });
        _this2.props.onSave(editedNotebook);
        _this2.props.onCancel();
      };

      var onTitleChange = function onTitleChange(event) {
        _this2.setState({ title: event.target.value });
      };

      return React.createElement(
        'div',
        { className: 'NotebookInput' },
        React.createElement(
          'div',
          { className: 'input-group' },
          React.createElement('input', { className: 'form-control input-lg', value: this.state.title,
            placeholder: 'Notebook title', onChange: onTitleChange
          }),
          React.createElement(
            'div',
            { className: 'input-group-btn' },
            React.createElement(
              'button',
              { className: 'btn btn-success btn-lg',
                onClick: submitAndStopEditing
              },
              React.createElement('i', { className: 'fa fa-check' })
            ),
            React.createElement(
              'button',
              { className: 'btn btn-danger btn-lg',
                style: { marginRight: '12px' },
                onClick: revertAndStopEditing
              },
              React.createElement('i', { className: 'fa fa-remove' })
            )
          )
        )
      );
    }
  }]);

  return NotebookEdit;
}(React.Component);

module.exports = NotebookEdit;

},{"lodash":"lodash","react":"react"}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactRedux = require('react-redux');
var _ = require('lodash');
var createActionDispatchers = require('../helpers/createActionDispatchers');
var notebooksActionCreators = require('../reducers/notebooks');
var NotebookNew = require('./NotebookNew');
var NoteNew = require('./NoteNew');

/*This is the Active Notebook class that represents a note which is clicked
 * and is supposed to show it's contents (notes) . If clicked again it will reset
 * the state and make active Notebook Id to -1 through calling the reducer resetNotebook()
 * passed to this component through its parent class, NotebookList.
 * Thus, Turning this Active note into a normal note.
 */

var ActiveNotebook = function (_React$Component) {
  _inherits(ActiveNotebook, _React$Component);

  //The constructor for using state.
  function ActiveNotebook(props) {
    _classCallCheck(this, ActiveNotebook);

    //Here we provide the state.
    var _this = _possibleConstructorReturn(this, (ActiveNotebook.__proto__ || Object.getPrototypeOf(ActiveNotebook)).call(this, props));

    _this.state = {

      //phrase is the search phrase. This is the phrase that is being typed in the search bar.
      phrase: '',
      //This stores notes that are not matching the search phrase.
      tempNotes: ''

    };

    return _this;
  }

  //This is what ActiveNotebook needs to render and what it is supposed to render.


  _createClass(ActiveNotebook, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      /* This is the createNote function which takes a note object as a parameter and returns either
       * an ActiveNote or a simple Note. Active note, similarly like an Active Notebook is supposed
       * to show its content, it is the resultant of a normal note being clicked, thus, on re-clicking
       * or actually clicking it will amke the content disappear and turn it into a normal note.
       * we will explain how below.
       */
      var createNote = function createNote(note) {

        /* The decision wether to return an ActiveNote or a normal note happens here.
         * We store an activeNoteId in the NotebookList state, so it compares a particular note's Id
         * with the active note Id , and if it turns out to be the active note, we return active note
         */
        if (note.id === _this2.props.activeNoteId) {
          //We pass key as the note's Id and the note itself along with it's title and content, we also pass in methods to delete and reset a note
          //resetting a note mean making it into a normal note.
          return React.createElement(ActiveNote, { key: note.id, title: note.title, note: note, resetNote: _this2.props.resetNote, deleteNote: _this2.props.deleteNote, content: note.content });
        }
        //We pass key as the note's Id and methods to load the note's ocntent and to delete a note
        //To load a note is basically making the note active and load it's contents.
        return React.createElement(Note, { key: note.id, note: note, loadNoteContent: _this2.props.loadNoteContent, deleteNote: _this2.props.deleteNote });
      };

      /*  The function that is called when we click an Active notebook
       *  The normal notebook have one of it's own.
       */
      var onClickNotebook = function onClickNotebook(event) {

        event.preventDefault();
        //This will call the reducer to reset the active notebook back to a normal notebook.
        _this2.props.resetNotebook();
      };

      // The fuction which is called when you press the delete button
      var onDeleteNotebookButtonClick = function onDeleteNotebookButtonClick(event) {

        //This will pass the notebookId to the action creator in the reducer.
        _this2.props.deleteNotebook(_this2.props.notebook.id);
      };

      //This is the function used moostly by the eraser button in the search bar.
      //other fucntions use it if we want everything back to intital state.
      var clearInput = function clearInput() {

        //It sets the current state to how it looked like initially.
        _this2.setState({
          phrase: '',
          tempNotes: ''
        });
        //It searches an empty string. Thus no results pop up. Just like the initial state.
        onSearch('');
      };

      //This is called when we change the input in the search bar.
      var onSearching = function onSearching(event) {

        //We record the typed text in our constant, phrase
        var phrase = event.target.value;
        //We set the state's phrase to out phrase
        _this2.setState({ phrase: phrase });
        //This further calls out another helper method which does the further procedure.
        onSearch(phrase);
      };

      //This is the function that is called by the onSearching function.
      var onSearch = function onSearch(phrase) {

        //It creates a temporary array which stores all the notes that are not supposed to be shown in the search results
        var tempNotes = [];

        //We set the tempNotes in our state to this empty tempNotes.To not to keep on adding stuffs in it.
        //If we dont do this, on one stage, we wont see anything in the search results.
        _this2.setState({ tempNotes: tempNotes });

        //For each notes we check if it has what it takes to be in the search results
        _this2.props.notes.map(function (note) {

          //If the tile or the contents of a note have that phrase in it somewehere, we do not push the note
          //The Empty phrase means initial state or no searching state, where all notes are supposed to be there
          //Thus, if the phrase id empty string we do not push the note.
          if (!(note.title.contains(phrase) || note.content.contains(phrase) || phrase === '')) {
            tempNotes.push(note);
          }
        });

        //we finally set the tempNotes in state to be the one we just prepared.
        _this2.setState({ tempNotes: tempNotes });
      };

      //The return statement shows what we are supposed to provide
      //A notebook title, click it and it becomes normal
      //A delete button
      //A search bar with an eraser
      //Add new note button
      //Search results
      //We use _.difference to display only the notes which are not in tempNotes, basically we are displayin search results.

      return React.createElement(
        'li',
        { className: 'UnorderedListChildNB' },
        React.createElement(
          'a',
          { className: 'activeTextNotebook', href: '#', onClick: onClickNotebook },
          this.props.notebook.title
        ),
        React.createElement(
          'button',
          { className: 'Red-Cross btn btn-danger btn-sm', onClick: onDeleteNotebookButtonClick },
          React.createElement('i', { className: 'fa fa-remove' })
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            { className: 'input-group' },
            React.createElement('input', {
              className: 'form-control input-lg',
              value: this.state.phrase,
              placeholder: 'Search....',
              onChange: onSearching

            }),
            React.createElement(
              'div',
              { className: 'input-group-btn' },
              React.createElement(
                'button',
                {
                  className: 'btn btn-warning btn-lg',
                  style: { marginRight: '12px' },
                  onClick: clearInput
                },
                React.createElement('i', { className: 'fa fa-eraser' })
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'Notes' },
            React.createElement(
              'h3',
              null,
              'Notes',
              React.createElement(NoteNew, { clearInput: clearInput, createNote: this.props.createNote, notebookId: this.props.activeNotebookId })
            ),
            React.createElement(
              'ol',
              null,
              _.difference(this.props.notes, this.state.tempNotes).map(function (note) {
                return createNote(note);
              })
            )
          )
        )
      );
    }
  }]);

  return ActiveNotebook;
}(React.Component);

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

//ActiveNote, which is the note that is highlighted and displays some content


var ActiveNote = function (_React$Component2) {
  _inherits(ActiveNote, _React$Component2);

  function ActiveNote(props) {
    _classCallCheck(this, ActiveNote);

    return _possibleConstructorReturn(this, (ActiveNote.__proto__ || Object.getPrototypeOf(ActiveNote)).call(this, props));
  }

  //The following is what that is going to be rendered and what assisting render


  _createClass(ActiveNote, [{
    key: 'render',
    value: function render() {
      var _this4 = this;

      //This is the function which is executed when a Note is clicked.
      var onClickNote = function onClickNote(event) {
        event.preventDefault();
        //This is the function that was passed to the Active note, which goes to the reducer and invokes action of reseting a note to it's normal state
        _this4.props.resetNote();
      };

      //This is the function that is going to be invoked when we click the delete button.
      var onDeleteNoteButtonClick = function onDeleteNoteButtonClick(event) {
        event.preventDefault();
        //This is the function that was passed to the Active note, which goes to the reducer and invokes action of deleting a note.
        _this4.props.deleteNote(_this4.props.note.id);
      };

      //We return a list element with a clickable title, which on clicking reverts back to normal,
      //A delete button which deletes the note
      //And the content of the note.
      return React.createElement(
        'li',
        { className: 'UnorderedListChildN' },
        React.createElement(
          'button',
          { className: 'Red-Cross btn btn-danger btn-xs', onClick: onDeleteNoteButtonClick },
          React.createElement('i', { className: 'fa fa-remove' })
        ),
        React.createElement(
          'a',
          { className: 'activeTextNote', href: '#', onClick: onClickNote },
          this.props.title,
          '    \u21D2'
        ),
        this.props.content
      );
    }
  }]);

  return ActiveNote;
}(React.Component);

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

//The class Note that renders a normal note with ability to being delted and show content


var Note = function (_React$Component3) {
  _inherits(Note, _React$Component3);

  function Note(props) {
    _classCallCheck(this, Note);

    return _possibleConstructorReturn(this, (Note.__proto__ || Object.getPrototypeOf(Note)).call(this, props));
  }

  _createClass(Note, [{
    key: 'render',
    value: function render() {
      var _this6 = this;

      //Fucntion called when note is clicked
      var onClickNote = function onClickNote(event) {
        event.preventDefault();
        //contents loaded when note clicked, call creating an action.
        _this6.props.loadNoteContent(_this6.props.note.id);
      };

      //Function called when delete button is clicked
      var onDeleteNoteButtonClick = function onDeleteNoteButtonClick(event) {
        event.preventDefault();
        //Note delted, call creating action to delete the note.
        _this6.props.deleteNote(_this6.props.note.id);
      };

      //We return a list element with a delete button and the note title
      return React.createElement(
        'li',
        { className: 'UnorderedListChildN' },
        React.createElement(
          'button',
          { className: 'Red-Cross btn btn-danger btn-xs', onClick: onDeleteNoteButtonClick },
          React.createElement('i', { className: 'fa fa-remove' })
        ),
        React.createElement(
          'a',
          { href: '#', onClick: onClickNote },
          this.props.note.title
        )
      );
    }
  }]);

  return Note;
}(React.Component);

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

//The class Notebook, responsible for redering a normal notebook


var Notebook = function (_React$Component4) {
  _inherits(Notebook, _React$Component4);

  function Notebook(props) {
    _classCallCheck(this, Notebook);

    return _possibleConstructorReturn(this, (Notebook.__proto__ || Object.getPrototypeOf(Notebook)).call(this, props));
  }

  //The following is what which will render or assist to render.


  _createClass(Notebook, [{
    key: 'render',
    value: function render() {
      var _this8 = this;

      //This is the function which is called when a Notebook title is clicked
      var onClickNotebook = function onClickNotebook(event) {
        event.preventDefault();
        //The below function was passed to the notes by NotebookList, it invokes action to load all the notes under this notebook.
        _this8.props.loadNotes(_this8.props.notebook.id);
      };

      //This is the function which is called when we press the delete button next to notebook.
      var onDeleteNotebookButtonClick = function onDeleteNotebookButtonClick(event) {
        //This will further dispatch an action and delete the notebook hose ID is passed in.
        _this8.props.deleteNotebook(_this8.props.notebook.id);
      };

      //We return a list element with a title and the delete button
      return React.createElement(
        'li',
        { className: 'UnorderedListChildNB' },
        React.createElement(
          'a',
          { href: '#', onClick: onClickNotebook },
          this.props.notebook.title
        ),
        React.createElement(
          'button',
          { className: 'Red-Cross btn btn-danger btn-xs', onClick: onDeleteNotebookButtonClick },
          React.createElement('i', { className: 'fa fa-remove' })
        )
      );
    }
  }]);

  return Notebook;
}(React.Component);

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

//This class is responsible for the search results we get from the search which uses API.


var SearchedNote = function (_React$Component5) {
  _inherits(SearchedNote, _React$Component5);

  function SearchedNote(props) {
    _classCallCheck(this, SearchedNote);

    return _possibleConstructorReturn(this, (SearchedNote.__proto__ || Object.getPrototypeOf(SearchedNote)).call(this, props));
  }

  _createClass(SearchedNote, [{
    key: 'render',
    value: function render() {

      return React.createElement(
        'li',
        { className: 'UnorderedListChildN' },
        this.props.note.title,
        '   :   ',
        this.props.note.content
      );
    }
  }]);

  return SearchedNote;
}(React.Component);

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

//This is the NotebookList class which represents the Notebook List and everything included in it.


var NotebookList = function (_React$Component6) {
  _inherits(NotebookList, _React$Component6);

  function NotebookList(props) {
    _classCallCheck(this, NotebookList);

    //This state has the phrase entered in the main API search bar(lets call it that for short)
    var _this10 = _possibleConstructorReturn(this, (NotebookList.__proto__ || Object.getPrototypeOf(NotebookList)).call(this, props));

    _this10.state = {
      phrase: ''
    };

    return _this10;
  }

  //Following is what that is rendered and assisting in rendering by the notebookList/


  _createClass(NotebookList, [{
    key: 'render',
    value: function render() {
      var _this11 = this;

      //This is the function which is called the very first by the NotebookList, it fills up our Notebooks
      var createNotebookListItem = function createNotebookListItem(notebook) {

        //We have activeNotebookId in the notebook state which represents the clicked notebook
        //Initially, the value of the activeNotebookId will be -1, so all normal notes will be returned and rendered.
        if (notebook.id === _this11.props.notebooks.activeNotebookId) {

          //We have discussed all the parameters the ActiveNotebook requies above.
          return React.createElement(ActiveNotebook, {
            key: notebook.id,
            notebook: notebook,
            deleteNotebook: _this11.props.deleteNotebook,
            notes: _this11.props.notebooks.notes,
            loadNotes: _this11.props.loadNotes,
            loadNoteContent: _this11.props.loadNoteContent,
            activeNoteId: _this11.props.notebooks.activeNoteId,
            deleteNote: _this11.props.deleteNote,
            createNote: _this11.props.createNote,
            activeNotebookId: _this11.props.notebooks.activeNotebookId,
            resetNote: _this11.props.resetNote,
            resetNotebook: _this11.props.resetNotebook
          });
        }

        //If not active, its a normal notebook, which just needs fuctions to delete and
        //fucntion to become active.
        return React.createElement(Notebook, {
          key: notebook.id,
          notebook: notebook,
          loadNotes: _this11.props.loadNotes,
          deleteNotebook: _this11.props.deleteNotebook
        });
      };

      //This is function which is called when we change/ type something in the input of the search bar
      var onSearching = function onSearching(event) {

        //The constant phrase takes in the text
        var phrase = event.target.value;
        //We then set the state to this phrase
        _this11.setState({ phrase: phrase });
        //We then search for the phrase
        onSearch(phrase);
      };

      //This is the function that carry out searching
      var onSearch = function onSearch(phrase) {

        //if the phrase is in default state or nothing is typed or everything is erased, then nothing is searched.
        if (!(phrase === '')) {
          //if there is actually something to search, we search
          //This will lead to dispatching an action that takes responsibility for searching using an api call.
          _this11.props.onSearchNotes(phrase);
        }
      };

      //This is the function invoked when we press the eraser button
      var clearInput = function clearInput() {

        //This brings back the initial state.
        _this11.setState({
          phrase: ''
        });

        //We search nothing, like the intial state
        onSearch('');
      };

      //This is the fuction which will create a notes based on the searchedNotes passed in as props, which came from the api
      //it calls the SearchedNote component for each note.
      var createNote = function createNote() {
        return _this11.props.notebooks.searchedNotes.map(function (note) {

          return React.createElement(SearchedNote, { key: note.id, note: note });
        });
      };

      //this is the function which loads notes that were searched
      var loadSearchedNotes = function loadSearchedNotes() {

        //If the phrase is in initial state or if the eraser button has been presssed then dont search.
        if (_this11.state.phrase === "") {}
        //Else search
        else {
            //We return A heading for search results and an ordered list of hte searched notes.
            return React.createElement(
              'div',
              { className: 'search' },
              React.createElement(
                'p',
                { className: 'searchHead' },
                'Search Results'
              ),
              React.createElement(
                'ol',
                null,
                createNote()
              )
            );
          }
      };

      //This is the search bar and the results of the search being displayed
      //we return an input box which takes text and calls the functions we discussed already
      //we load the search results
      //We give the option to add new notebooks
      //We retrun the list of notebooks too
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'input-group' },
          React.createElement('input', {
            className: 'form-control input-lg',
            value: this.state.phrase,
            placeholder: 'Search....',
            onChange: onSearching

          }),
          React.createElement(
            'div',
            { className: 'input-group-btn' },
            React.createElement(
              'button',
              {
                className: 'btn btn-warning btn-lg',
                style: { marginRight: '12px' },
                onClick: clearInput
              },
              React.createElement('i', { className: 'fa fa-eraser' })
            )
          )
        ),
        React.createElement(
          'div',
          null,
          loadSearchedNotes()
        ),
        React.createElement(
          'h2',
          null,
          'Notebooks',
          React.createElement(NotebookNew, {
            createNotebook: this.props.createNotebook
          })
        ),
        React.createElement(
          'ul',
          { className: 'listOfNotebooks' },
          this.props.notebooks.notebooks.map(createNotebookListItem)
        )
      );
    }
  }]);

  return NotebookList;
}(React.Component);

//the below function passes the reducer notebook's state to the NotebookList as props


var NotebookListContainer = ReactRedux.connect(function (state) {
  return {
    notebooks: state.notebooks,
    notes: state.notes,
    activeNoteId: state.activeNoteId,
    searchedNotes: state.searchedNotes
  };
}, createActionDispatchers(notebooksActionCreators))(NotebookList);

//We export the NotebookListContainer
module.exports = NotebookListContainer;

},{"../helpers/createActionDispatchers":13,"../reducers/notebooks":16,"./NoteNew":6,"./NotebookNew":9,"lodash":"lodash","react":"react","react-redux":"react-redux"}],9:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var NotebookEdit = require('./NotebookEdit');

/**
 * A button that expands  into a form when it is clicked
 */

var NotebookNew = function (_React$Component) {
  _inherits(NotebookNew, _React$Component);

  function NotebookNew(props) {
    _classCallCheck(this, NotebookNew);

    //set the intital interanl state for this ocmpoentne
    var _this = _possibleConstructorReturn(this, (NotebookNew.__proto__ || Object.getPrototypeOf(NotebookNew)).call(this, props));

    _this.state = { editing: false };
    return _this;
  }

  _createClass(NotebookNew, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var openEdit = function openEdit() {
        _this2.setState({ editing: true });
      };

      var closeEdit = function closeEdit() {
        _this2.setState({ editing: false });
      };

      var createNotebook = function createNotebook(newNotebook) {
        _this2.props.createNotebook(newNotebook, function (err) {
          if (!err) closeEdit();
        });
      };

      if (this.state.editing) {

        return React.createElement(NotebookEdit, {
          notebook: this.props.notebook,
          onSave: createNotebook,
          onCancel: closeEdit
        });
      }

      return React.createElement(
        'button',
        { className: 'new-notebook-button btn btn-primary', onClick: openEdit },
        React.createElement('i', { className: 'new-notebook-button-plus fa fa-plus' }),
        'Notebook'
      );
    }
  }]);

  return NotebookNew;
}(React.Component);

module.exports = NotebookNew;

},{"./NotebookEdit":7,"react":"react"}],10:[function(require,module,exports){
'use strict';

/**
 * The root React component from which all other components on the page are
 * descended. It is this component which is directly mounted on the DOM.
 */

var React = require('react');
var ReactRedux = require('react-redux');

var Provider = ReactRedux.Provider;
var Home = require('./Home');

// Enable development tools when in development mode
var DevTools = 'span';
if ("development" === 'development') {
  DevTools = require('./DevTools');
}

// Define the Root component
var Root = function Root(props) {
  return (
    /* The Provider gives descendants the ability to connect to the Redux store */
    React.createElement(
      Provider,
      { store: props.store },
      React.createElement(
        'div',
        null,
        React.createElement(Home, null),
        React.createElement(DevTools, null)
      )
    )
  );
};

module.exports = Root;

},{"./DevTools":2,"./Home":3,"react":"react","react-redux":"react-redux"}],11:[function(require,module,exports){
'use strict';

/**
 * This helper file provides a set of functions for performing HTTP requests.
 * It will work on both the backend and the frontend.
 */

var ajax = {};

if (true) {
  ajax.request = function (opts) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('error', function () {
        reject(new Error('Request failed'));
      });
      xhr.addEventListener('load', function () {
        if (xhr.status !== 200) {
          reject(new Error('Received status ' + xhr.status));
        } else {
          resolve(opts.json ? JSON.parse(xhr.responseText) : xhr.responseText);
        }
      });
      xhr.open(opts.method, opts.url);
      if (opts.json) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(opts.data !== undefined ? JSON.stringify(opts.data) : opts.data);
      } else {
        xhr.send(opts.data);
      }
    });
  };
} else {
  var request = require('request');

  ajax.request = function (opts) {
    return new Promise(function (resolve, reject) {
      request({
        url: opts.url,
        method: opts.method,
        body: opts.data,
        json: opts.json
      }, function (error, response, body) {
        if (error) {
          reject(error);
        } else if (response.statusCode !== 200) {
          reject(new Error('Received status ' + response.statusCode));
        } else {
          resolve(body);
        }
      });
    });
  };
}

module.exports = ajax;

},{"request":"request"}],12:[function(require,module,exports){
'use strict';

/**
 * This helper file provides a set of functions for communicating with the
 * backend API. It will work on both the backend and the frontend.
 */

var ajax = require('./ajax');

var api = {};

if (true) {
  api.baseUrl = '/api';
} else {
  api.baseUrl = 'http://api:3000';
}

api.get = function (path) {
  return ajax.request({
    method: 'GET',
    url: this.baseUrl + path,
    json: true
  });
};

api.post = function (path, data) {
  return ajax.request({
    method: 'POST',
    url: this.baseUrl + path,
    json: true,
    data: data
  });
};

api.put = function (path, data) {
  return ajax.request({
    method: 'PUT',
    url: this.baseUrl + path,
    json: true,
    data: data
  });
};

api.delete = function (path) {
  return ajax.request({
    method: 'DELETE',
    url: this.baseUrl + path,
    json: true
  });
};

module.exports = api;

},{"./ajax":11}],13:[function(require,module,exports){
'use strict';

/**
 * Returns a function that, when given a dispatch function, returns an
 * object containing a bunch of action dispatchers.
 */
var createActionDispatchers = function createActionDispatchers() {
  for (var _len = arguments.length, actionCreatorGroups = Array(_len), _key = 0; _key < _len; _key++) {
    actionCreatorGroups[_key] = arguments[_key];
  }

  return function (dispatch) {
    return (
      // Iterate over actionCreatorsArray, which is an array of arrays of action
      // creators
      actionCreatorGroups.reduce(function (actionDispatchers, actionCreators) {
        // Add an action dispatcher for each action creator in actionCreators
        Object.keys(actionCreators).filter(function (name) {
          return typeof actionCreators[name] === 'function';
        }).forEach(function (name) {
          actionDispatchers[name] = function () {
            for (var _len2 = arguments.length, actionCreatorArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              actionCreatorArgs[_key2] = arguments[_key2];
            }

            return dispatch(actionCreators[name].apply(this, actionCreatorArgs));
          };
        });
        return actionDispatchers;
      }, {})
    );
  };
};

module.exports = createActionDispatchers;

},{}],14:[function(require,module,exports){
'use strict';

/**
 * This helper file provides a function for creating the Redux store. In
 * development mode it will also connect up the Redux development tools for
 * debugging purposes.
 */

var Redux = require('redux');
var reduxThunk = require('redux-thunk').default;
var combinedReducers = require('../reducers');

var finalCreateStore = void 0;

if ("development" === 'production') {
  finalCreateStore = Redux.compose(
  // Enables middleware
  Redux.applyMiddleware(reduxThunk))(Redux.createStore);
} else {
  var DevTools = require('../components/DevTools');

  finalCreateStore = Redux.compose(
  // Enables middleware
  Redux.applyMiddleware(reduxThunk),
  // Enables DevTools
  DevTools.instrument())(Redux.createStore);
}

module.exports = function (initialState) {
  return finalCreateStore(combinedReducers, initialState);
};

},{"../components/DevTools":2,"../reducers":15,"redux":"redux","redux-thunk":"redux-thunk"}],15:[function(require,module,exports){
'use strict';

/**
 * Specify all of your reducers in this file, so they can be combined into
 * one big reducer.
 */

var Redux = require('redux');

module.exports = Redux.combineReducers({
  notebooks: require('./notebooks')
  /* *** TODO: Put any other reducers in here *** */
  // eg. `notes: require('./notes')` if you have a reducer in reducers/notes.js
});

},{"./notebooks":16,"redux":"redux"}],16:[function(require,module,exports){
'use strict';

var _ = require('lodash');
var api = require('../helpers/api');

// Action type constants
/* *** TODO: Put action constants here *** */
var UPDATE = 'myapp/UPDATE';
var CREATE = 'myapp/CREATE';
var DELETE = 'myapp/DELETE';
var SHOW = 'myapp/SHOW';
var DELETEN = 'myapp/DELETEN';
var CREATEN = 'myapp/CREATEn';
var SEARCHED = 'myapp/SEARCHED';
var RESETNOTE = 'myapp/RESETNOTE';
var RESETNOTEBOOK = 'myapp/RESETNOTEBOOK';

var initialState = {
  notebooks: [{ id: 100, title: 'From Redux Store: A hard-coded notebook' }, { id: 101, title: 'From Redux Store: Another hard-coded notebook' }],
  activeNotebookId: -1,
  notes: [],
  activeNoteId: -1, //Added new Line for note
  searchedNotes: []
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch (action.type) {
    /* *** TODO: Put per-action code here *** */
    case UPDATE:
      {
        return Object.assign({}, state, { activeNotebookId: action.notebookId,
          notes: action.notes, activeNoteId: -1 });
      }

    case RESETNOTE:
      {
        return Object.assign({}, state, { activeNoteId: -1 });
      }

    case RESETNOTEBOOK:
      {
        return Object.assign({}, state, { activeNotebookId: -1 });
      }

    case CREATE:
      {
        var unsortedNotebooks = _.concat(state.notebooks, action.notebook);

        var notebooks = _.orderBy(unsortedNotebooks, 'createdAt', 'desc');

        return _.assign({}, state, { notebooks: notebooks });
      }
    case DELETE:
      {
        var newState = _.clone(state);
        newState.notebooks = _.reject(state.notebooks, { id: action.notebookId });
        return newState;
      }
    case SHOW:
      {
        return Object.assign({}, state, { activeNoteId: action.noteId });
      }
    case DELETEN:
      {
        var _newState = _.clone(state);
        _newState.notes = _.reject(state.notes, { id: action.noteId });
        return _newState;
      }
    case CREATEN:
      {
        var unsortedNotes = _.concat(state.notes, action.note);
        var notes = _.orderBy(unsortedNotes, 'createdAt', 'desc');
        return _.assign({}, state, { notes: notes });
      }
    case SEARCHED:
      {
        var searchedNotes = action.notes;
        var _notebooks = action.tempNotebooks;
        return _.assign({}, state, { searchedNotes: searchedNotes });
      }
    default:
      return state;
  }
}

// Action creators
/* *** TODO: Put action creators here *** */
reducer.loadNotes = function (notebookId) {
  return function (dispatch) {
    api.get('/notebooks/' + notebookId + '/notes').then(function (notes) {
      dispatch({ type: UPDATE, notebookId: notebookId, notes: notes });
    });
  };
};

reducer.loadNoteContent = function (noteId) {
  return function (dispatch) {
    api.get('/notes/' + noteId).then(function (note) {
      dispatch({ type: SHOW, noteId: noteId });
    });
  };
};

reducer.resetNote = function () {
  return function (dispatch) {
    dispatch({ type: RESETNOTE });
  };
};

reducer.resetNotebook = function () {
  return function (dispatch) {
    console.log('calling reset');
    dispatch({ type: RESETNOTEBOOK });
  };
};

reducer.deleteNotebook = function (notebookId) {
  return function (dispatch) {
    api.delete('/notebooks/' + notebookId).then(function (notebook) {
      dispatch({ type: DELETE, notebookId: notebookId });
    });
  };
};

reducer.createNotebook = function (newNotebook, callback) {
  return function (dispatch) {
    api.post('/notebooks', newNotebook).then(function (notebook) {
      dispatch({ type: CREATE, notebook: notebook });
    });
  };
};

reducer.createNote = function (newNote, callback) {
  return function (dispatch) {
    api.post('/notes', newNote).then(function (note) {
      dispatch({ type: CREATEN, note: note });
    });
  };
};

reducer.deleteNote = function (noteId) {
  return function (dispatch) {
    api.delete('/notes/' + noteId).then(function (note) {
      dispatch({ type: DELETEN, noteId: noteId });
    });
  };
};

reducer.onSearchNotes = function (phrase) {
  return function (dispatch) {
    api.get('/search/notes/' + phrase).then(function (notes) {

      var tempNotebooks = [];

      notes.map(function (note) {
        api.get('/notebooks/' + note.notebookId).then(function (notebook) {
          tempNotebooks.push(notebook);
        });
        console.log(tempNotebooks);
      });
      dispatch({ type: SEARCHED, tempNotebooks: tempNotebooks, notes: notes });
    });
  };
};

// Export the action creators and reducer
module.exports = reducer;

},{"../helpers/api":12,"lodash":"lodash"}]},{},[1])

//# sourceMappingURL=/assets/js/app.js.map
