const React = require('react');
const ReactRedux = require('react-redux');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');
const NotebookNew = require('./NotebookNew');
const NoteNew = require('./NoteNew');

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/


class ActiveNotebook extends React.Component {
constructor(props) {
    super(props);

  }
  render() {
    const createNote = (note) => {
      if(note.id === this.props.activeNoteId) {
        return <ActiveNote key={note.id} title={note.title} note={note} loadNoteContent={this.props.loadNoteContent} deleteNote={this.props.deleteNote} content={note.content}/>;
      }

      return <Note key={note.id} note={note} loadNoteContent={this.props.loadNoteContent} deleteNote={this.props.deleteNote}/>;
    }

    const onClickNotebook = (event) => {
      event.preventDefault();
      this.props.loadNotes(this.props.notebook.id);
      //should i make another call to a method that can solve this problem?
      //a method that can change the state.. call to the reducer
    };

    const onDeleteNotebookButtonClick = (event) => {
      this.props.deleteNotebook(this.props.notebook.id);
    };
      //made a button bigger when active
    return (
      <li className="UnorderedListChildNB">

        <a className="activeTextNotebook" href="#" onClick={onClickNotebook}>
         {this.props.notebook.title}
        </a>

        <button className="Red-Cross btn btn-danger btn-sm" onClick={onDeleteNotebookButtonClick}>
          <i className="fa fa-remove"></i>
        </button>

        <div className="Notes">
        <h3>Notes
        <NoteNew createNote ={this.props.createNote} notebookId={this.props.activeNotebookId}/>
        </h3>
        <ol>
          {this.props.notes.map(createNote)}
        </ol>
        </div>

      </li>
    );
  }
}

class ActiveNote extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){

    const onClickNote = (event) => {
      event.preventDefault();
      this.props.loadNoteContent(this.props.note.id);
    };

    const onDeleteNoteButtonClick = (event) => {
      event.preventDefault();
      this.props.deleteNote(this.props.note.id);
    };

    return (
      <li className="UnorderedListChildN">

        <button className="Red-Cross btn btn-danger btn-xs" onClick={onDeleteNoteButtonClick}>
          <i className="fa fa-remove"></i>
        </button>

        <a className="activeTextNote" href="#" onClick={onClickNote}>
          {this.props.title}    &rArr;
        </a>

        {this.props.content}
      </li>
    );
  }
}

class Note extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const onClickNote = (event) => {
      event.preventDefault();
      this.props.loadNoteContent(this.props.note.id);
    };

    const onDeleteNoteButtonClick = (event) => {
      event.preventDefault();
      this.props.deleteNote(this.props.note.id);
    };

    return(
      <li className="UnorderedListChildN">

        <button className="Red-Cross btn btn-danger btn-xs" onClick={onDeleteNoteButtonClick}>
          <i className="fa fa-remove"></i>
        </button>

        <a href="#" onClick={onClickNote}>
          {this.props.note.title}
        </a>

        </li>

    );
  }
}

class Notebook extends React.Component {
constructor(props) {
    super(props);
  }
  render() {
    const onClickNotebook = (event) => {
      event.preventDefault();
      this.props.loadNotes(this.props.notebook.id);
    };

    const onDeleteNotebookButtonClick = (event) => {
      this.props.deleteNotebook(this.props.notebook.id);
    };

    return (
      <li className="UnorderedListChildNB">

          <a href="#" onClick={onClickNotebook}>
            {this.props.notebook.title}
          </a>

          <button className="Red-Cross btn btn-danger btn-xs" onClick={onDeleteNotebookButtonClick}>
            <i className="fa fa-remove"></i>
          </button>


      </li>
      //New comment d
    );
  }
}

class NotebookList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const createNotebookListItem = (notebook) => {

      if(notebook.id === this.props.notebooks.activeNotebookId) {
        return (
          <ActiveNotebook
            key={notebook.id}
            notebook={notebook}
            deleteNotebook={this.props.deleteNotebook}
            notes={this.props.notebooks.notes}
            loadNotes={this.props.loadNotes}
            loadNoteContent={this.props.loadNoteContent}
            activeNoteId={this.props.notebooks.activeNoteId}
            deleteNote = {this.props.deleteNote}
            createNote = {this.props.createNote}
            activeNotebookId ={this.props.notebooks.activeNotebookId}
          />
        );
      }
      return (
          <Notebook
              key={notebook.id}
              notebook={notebook}
              loadNotes={this.props.loadNotes}
              deleteNotebook={this.props.deleteNotebook}
          />
      );
    };



    return (
      <div>
        <h2>Notebooks
        <NotebookNew
            createNotebook={this.props.createNotebook}
          />
          </h2>
        <ul className="listOfNotebooks">
          {this.props.notebooks.notebooks.map(createNotebookListItem)}
        </ul>
      </div>
    );
  }
}

const NotebookListContainer = ReactRedux.connect(

  (state) => {
    return {
    notebooks: state.notebooks,
    //activeNotebookId: state.activeNotebookId,
    notes: state.notes,
    activeNoteId: state.activeNoteId,
    };
  },
  createActionDispatchers(notebooksActionCreators)
)(NotebookList);

module.exports = NotebookListContainer;
