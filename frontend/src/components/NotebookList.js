const React = require('react');
const ReactRedux = require('react-redux');
const _ = require('lodash');
const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');
const NotebookNew = require('./NotebookNew');
const NoteNew = require('./NoteNew');



class ActiveNotebook extends React.Component {

  constructor(props) {

      super(props);

      this.state={

        phrase: '',
        tempNotes:'',

      };

  }

  render() {

    const createNote = (note) => {

        if(note.id === this.props.activeNoteId) {
          return <ActiveNote key={note.id} title={note.title} note={note} resetNote={this.props.resetNote} deleteNote={this.props.deleteNote} content={note.content}/>;
        }
        return <Note key={note.id} note={note} loadNoteContent={this.props.loadNoteContent} deleteNote={this.props.deleteNote}/>;

    }

    const onClickNotebook = (event) => {
      event.preventDefault();
      this.props.resetNotebook();
    };

    const onDeleteNotebookButtonClick = (event) => {
      this.props.deleteNotebook(this.props.notebook.id);
    };

    const clearInput = () => {

      this.setState({
        phrase:'',
        tempNotes: '',
      });
      onSearch('');
    };

    const onSearching = (event) => {

          const phrase = event.target.value;
          this.setState({phrase});
          onSearch(phrase);

    };

    const onSearch = (phrase) => {

        const tempNotes=[];
        this.setState({tempNotes});

        this.props.notes.map(note => {


          if(!(note.title.contains(phrase)|| note.content.contains(phrase) || phrase ===''))
          {
            tempNotes.push(note);
          }

        })

        this.setState({tempNotes});

   }

    return (
      <li className="UnorderedListChildNB">

        <a className="activeTextNotebook" href="#" onClick={onClickNotebook}>
         {this.props.notebook.title}
        </a>

        <button className="Red-Cross btn btn-danger btn-sm" onClick={onDeleteNotebookButtonClick}>
          <i className="fa fa-remove"></i>
        </button>

        <div>
          <div className="input-group">

              <input
                className="form-control input-lg"
                value={this.state.phrase}
                placeholder="Search...."
                onChange={onSearching}

              />

              <div className="input-group-btn">

                  <button
                    className="btn btn-warning btn-lg"
                    style={{marginRight: '12px'}}
                    onClick={clearInput}
                  >
                  <i className="fa fa-eraser"></i>
                  </button>

              </div>

        </div>

        <div className="Notes">

                  <h3>Notes
                  <NoteNew clearInput={clearInput} createNote ={this.props.createNote} notebookId={this.props.activeNotebookId}/>
                  </h3>

                  <ol>
                    { _.difference(this.props.notes,this.state.tempNotes).map(note => createNote(note))}
                  </ol>

        </div>

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
      this.props.resetNote();
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


class SearchedNote extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){

    return (
      <li className="UnorderedListChildN">
          {this.props.note.title}   :   {this.props.note.content}
      </li>
    );
  }
}



class NotebookList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      phrase:'',
    };
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
            resetNote = {this.props.resetNote}
            resetNotebook = {this.props.resetNotebook}
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

    const onSearching = (event) => {

        const phrase = event.target.value;
        this.setState({phrase});
        onSearch(phrase);

    };

    const onSearch = (phrase) => {
      if(!(phrase===''))
      {
        this.props.onSearchNotes(phrase);
      }
    };

    const clearInput = () => {

      this.setState({
        phrase:'',
      });

      onSearch('  24pytg38vhtu  iohfWCsdvSDV SJKC j njvsdjalvnv;jv;nasv0E GH4[IOGAGIOHfu')
    };

    const createNote = () => {
      return this.props.notebooks.searchedNotes.map((note) => {

                return <SearchedNote key={note.id} note={note}/>

                })
    }

    const loadSearchedNotes = () => {

      console.log('table:')
      console.table(this.props.notebooks.searchedNotes);

      if(this.state.phrase==="")
      {

      }
      else{
          return(
                  <ol>
                  {
                    createNote()
                  }
                  </ol>
          )
        }

    }

    return (
      <div>

        <div className="input-group">

              <input
                className="form-control input-lg"
                value={this.state.phrase}
                placeholder="Search...."
                onChange={onSearching}

              />

              <div className="input-group-btn">

                  <button
                    className="btn btn-warning btn-lg"
                    style={{marginRight: '12px'}}
                    onClick={clearInput}
                  >
                  <i className="fa fa-eraser"></i>
                  </button>

              </div>
        </div>

        <div>

          <p>Search Results</p>

          {loadSearchedNotes()}

        </div>

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
    notes: state.notes,
    activeNoteId: state.activeNoteId,
    searchedNotes: state.searchedNotes,
    };
  },
  createActionDispatchers(notebooksActionCreators)
)(NotebookList);

module.exports = NotebookListContainer;
