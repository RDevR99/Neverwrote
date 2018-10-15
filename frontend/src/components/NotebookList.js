const React = require('react');
const ReactRedux = require('react-redux');
const _ = require('lodash');
const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');
const NotebookNew = require('./NotebookNew');
const NoteNew = require('./NoteNew');


/*This is the Active Notebook class that represents a note which is clicked
 * and is supposed to show it's contents (notes) . If clicked again it will reset
 * the state and make active Notebook Id to -1 through calling the reducer resetNotebook()
 * passed to this component through its parent class, NotebookList.
 * Thus, Turning this Active note into a normal note.
 */
class ActiveNotebook extends React.Component {

  //The constructor for using state.
  constructor(props) {

      super(props);

      //Here we provide the state.
      this.state={

        //phrase is the search phrase. This is the phrase that is being typed in the search bar.
        phrase: '',
        //This stores notes that are not matching the search phrase.
        tempNotes:'',

      };

  }

  //This is what ActiveNotebook needs to render and what it is supposed to render.
  render() {

    /* This is the createNote function which takes a note object as a parameter and returns either
     * an ActiveNote or a simple Note. Active note, similarly like an Active Notebook is supposed
     * to show its content, it is the resultant of a normal note being clicked, thus, on re-clicking
     * or actually clicking it will amke the content disappear and turn it into a normal note.
     * we will explain how below.
     */
    const createNote = (note) => {

        /* The decision wether to return an ActiveNote or a normal note happens here.
         * We store an activeNoteId in the NotebookList state, so it compares a particular note's Id
         * with the active note Id , and if it turns out to be the active note, we return active note
         */
        if(note.id === this.props.activeNoteId) {
          //We pass key as the note's Id and the note itself along with it's title and content, we also pass in methods to delete and reset a note
          //resetting a note mean making it into a normal note.
          return <ActiveNote key={note.id} title={note.title} note={note} resetNote={this.props.resetNote} deleteNote={this.props.deleteNote} content={note.content}/>;
        }
        //We pass key as the note's Id and methods to load the note's ocntent and to delete a note
        //To load a note is basically making the note active and load it's contents.
        return <Note key={note.id} note={note} loadNoteContent={this.props.loadNoteContent} deleteNote={this.props.deleteNote}/>;

    }

    /*  The function that is called when we click an Active notebook
     *  The normal notebook have one of it's own.
     */
    const onClickNotebook = (event) => {

      event.preventDefault();
      //This will call the reducer to reset the active notebook back to a normal notebook.
      this.props.resetNotebook();

    };

    // The fuction which is called when you press the delete button
    const onDeleteNotebookButtonClick = (event) => {

      //This will pass the notebookId to the action creator in the reducer.
      this.props.deleteNotebook(this.props.notebook.id);

    };


    //This is the function used moostly by the eraser button in the search bar.
    //other fucntions use it if we want everything back to intital state.
    const clearInput = () => {

      //It sets the current state to how it looked like initially.
      this.setState({
        phrase:'',
        tempNotes: '',
      });
      //It searches an empty string. Thus no results pop up. Just like the initial state.
      onSearch('');

    };


    //This is called when we change the input in the search bar.
    const onSearching = (event) => {

          //We record the typed text in our constant, phrase
          const phrase = event.target.value;
          //We set the state's phrase to out phrase
          this.setState({phrase});
          //This further calls out another helper method which does the further procedure.
          onSearch(phrase);

    };

    //This is the function that is called by the onSearching function.
    const onSearch = (phrase) => {

        //It creates a temporary array which stores all the notes that are not supposed to be shown in the search results
        const tempNotes=[];

        //We set the tempNotes in our state to this empty tempNotes.To not to keep on adding stuffs in it.
        //If we dont do this, on one stage, we wont see anything in the search results.
        this.setState({tempNotes});

        //For each notes we check if it has what it takes to be in the search results
        this.props.notes.map(note => {

          //If the tile or the contents of a note have that phrase in it somewehere, we do not push the note
          //The Empty phrase means initial state or no searching state, where all notes are supposed to be there
          //Thus, if the phrase id empty string we do not push the note.
          if(!(note.title.contains(phrase)|| note.content.contains(phrase) || phrase ===''))
          {
            tempNotes.push(note);
          }

        })

        //we finally set the tempNotes in state to be the one we just prepared.
        this.setState({tempNotes});

   }



    //The return statement shows what we are supposed to provide
    //A notebook title, click it and it becomes normal
    //A delete button
    //A search bar with an eraser
    //Add new note button
    //Search results
    //We use _.difference to display only the notes which are not in tempNotes, basically we are displayin search results.

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

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

//ActiveNote, which is the note that is highlighted and displays some content
class ActiveNote extends React.Component {
  constructor(props) {
    super(props);
  }

  //The following is what that is going to be rendered and what assisting render
  render(){

    //This is the function which is executed when a Note is clicked.
    const onClickNote = (event) => {
      event.preventDefault();
      //This is the function that was passed to the Active note, which goes to the reducer and invokes action of reseting a note to it's normal state
      this.props.resetNote();
    };

    //This is the function that is going to be invoked when we click the delete button.
    const onDeleteNoteButtonClick = (event) => {
      event.preventDefault();
      //This is the function that was passed to the Active note, which goes to the reducer and invokes action of deleting a note.
      this.props.deleteNote(this.props.note.id);
    };


    //We return a list element with a clickable title, which on clicking reverts back to normal,
    //A delete button which deletes the note
    //And the content of the note.
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

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

//The class Note that renders a normal note with ability to being delted and show content
class Note extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){

    //Fucntion called when note is clicked
    const onClickNote = (event) => {
      event.preventDefault();
      //contents loaded when note clicked, call creating an action.
      this.props.loadNoteContent(this.props.note.id);
    };

    //Function called when delete button is clicked
    const onDeleteNoteButtonClick = (event) => {
      event.preventDefault();
      //Note delted, call creating action to delete the note.
      this.props.deleteNote(this.props.note.id);
    };


    //We return a list element with a delete button and the note title
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

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

//The class Notebook, responsible for redering a normal notebook
class Notebook extends React.Component {

  constructor(props) {
    super(props);
  }

  //The following is what which will render or assist to render.
  render() {

    //This is the function which is called when a Notebook title is clicked
    const onClickNotebook = (event) => {
      event.preventDefault();
      //The below function was passed to the notes by NotebookList, it invokes action to load all the notes under this notebook.
      this.props.loadNotes(this.props.notebook.id);
    };

    //This is the function which is called when we press the delete button next to notebook.
    const onDeleteNotebookButtonClick = (event) => {
      //This will further dispatch an action and delete the notebook hose ID is passed in.
      this.props.deleteNotebook(this.props.notebook.id);
    };

    //We return a list element with a title and the delete button
    return (
      <li className="UnorderedListChildNB">

          <a href="#" onClick={onClickNotebook}>
            {this.props.notebook.title}
          </a>

          <button className="Red-Cross btn btn-danger btn-xs" onClick={onDeleteNotebookButtonClick}>
            <i className="fa fa-remove"></i>
          </button>


      </li>

    );
  }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

//This class is responsible for the search results we get from the search which uses API.
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

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

//This is the NotebookList class which represents the Notebook List and everything included in it.
class NotebookList extends React.Component {

  constructor(props) {

    super(props);
    //This state has the phrase entered in the main API search bar(lets call it that for short)
    this.state = {
      phrase:'',
    };

  }

  //Following is what that is rendered and assisting in rendering by the notebookList/
  render() {

    //This is the function which is called the very first by the NotebookList, it fills up our Notebooks
    const createNotebookListItem = (notebook) => {

      //We have activeNotebookId in the notebook state which represents the clicked notebook
      //Initially, the value of the activeNotebookId will be -1, so all normal notes will be returned and rendered.
      if(notebook.id === this.props.notebooks.activeNotebookId) {

        //We have discussed all the parameters the ActiveNotebook requies above.
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

      //If not active, its a normal notebook, which just needs fuctions to delete and
      //fucntion to become active.
      return (
          <Notebook
              key={notebook.id}
              notebook={notebook}
              loadNotes={this.props.loadNotes}
              deleteNotebook={this.props.deleteNotebook}
          />
      );
    };


    //This is function which is called when we change/ type something in the input of the search bar
    const onSearching = (event) => {

        //The constant phrase takes in the text
        const phrase = event.target.value;
        //We then set the state to this phrase
        this.setState({phrase});
        //We then search for the phrase
        onSearch(phrase);

    };

    //This is the function that carry out searching
    const onSearch = (phrase) => {

      //if the phrase is in default state or nothing is typed or everything is erased, then nothing is searched.
      if(!(phrase===''))
      {
        //if there is actually something to search, we search
        //This will lead to dispatching an action that takes responsibility for searching using an api call.
        this.props.onSearchNotes(phrase);
      }
    };


    //This is the function invoked when we press the eraser button
    const clearInput = () => {

      //This brings back the initial state.
      this.setState({
        phrase:'',
      });

      //We search nothing, like the intial state
      onSearch('')
    };


    //This is the fuction which will create a notes based on the searchedNotes passed in as props, which came from the api
    //it calls the SearchedNote component for each note.
    const createNote = () => {
      return this.props.notebooks.searchedNotes.map((note) => {

                return <SearchedNote key={note.id} note={note}/>

                })
    }

    //this is the function which loads notes that were searched
    const loadSearchedNotes = () => {

      //If the phrase is in initial state or if the eraser button has been presssed then dont search.
      if(this.state.phrase==="" )
      {

      }
      //Else search
      else{
          //We return A heading for search results and an ordered list of hte searched notes.
          return(
                  <div className="search">

                    <p className="searchHead">Search Results</p>

                    <ol>
                    {
                      createNote()
                    }
                    </ol>

                  </div>
          )
        }

    }


    //This is the search bar and the results of the search being displayed
    //we return an input box which takes text and calls the functions we discussed already
    //we load the search results
    //We give the option to add new notebooks
    //We retrun the list of notebooks too
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

//the below function passes the reducer notebook's state to the NotebookList as props
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


//We export the NotebookListContainer
module.exports = NotebookListContainer;
