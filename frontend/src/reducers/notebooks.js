const _ = require('lodash');
const api = require('../helpers/api');

//Following are all the action constants that I have used.
const UPDATE = 'myapp/UPDATE'; //Update Notebook to an Active Notebook
const CREATE = 'myapp/CREATE'; //Create Notebook
const DELETE = 'myapp/DELETE'; //Delete Notebook
const SHOW = 'myapp/SHOW'; //Show note's content
const DELETEN = 'myapp/DELETEN';//Delete Note
const CREATEN = 'myapp/CREATEn';//Create Note
const SEARCHED = 'myapp/SEARCHED';	//Search the notes
const RESETNOTE = 'myapp/RESETNOTE';	//Reset an active note to a normal note.
const RESETNOTEBOOK ='myapp/RESETNOTEBOOK'; //Reset an active notebook to a normal notebook.

//we set the initial state with some hard-coded data
//Active notebookId and noteId are set to -1 so that none of the notes and notebooks are active.
//notes[] store the notes that are supposed to be displayed in an active notebook
//Searched notes store all the notes that we are have searched.
const initialState = {
  notebooks: [
    { id: 100, title: 'From Redux Store: A hard-coded notebook' },
    { id: 101, title: 'From Redux Store: Another hard-coded notebook' },
  ],
  activeNotebookId: -1,
  notes:[],
  activeNoteId: -1, //Added new Line for note
  searchedNotes:[],
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    //We placed the per action code in here
    //We assign an active notebookId passed as an action to us and notes too
    //This is the backbone behind an active notebook and the list of notes
    case UPDATE: {
      return Object.assign({}, state, { activeNotebookId:action.notebookId,
      notes: action.notes, activeNoteId: -1});
    }

    //Reset note to an active note back to a normal note
    case RESETNOTE: {
      return Object.assign({}, state, { activeNoteId: -1});
    }
	
    //Reset an active notebook back to a normal notebook.
    case RESETNOTEBOOK:{
       return Object.assign({}, state, { activeNotebookId:-1});
    }
	
    //We create a notebook by adding a notebook to our collection of notebooks and store it into a constant
    case CREATE: {
      const unsortedNotebooks = _.concat(state.notebooks,action.notebook);
	  //notebooks are sorted in descending order based on their creation date and placed into another constant
      const notebooks = _.orderBy(unsortedNotebooks, 'createdAt', 'desc');
	  //We return a new state with our updated notebooks
      return _.assign({}, state, {notebooks});
    }
      
    //We first create a clone of our current state.
    //now we set the notebooks in the new constant with a copy of it, just rejecting the notebookId that is supposed to be deleted
    case DELETE: {
      const newState = _.clone(state);
      newState.notebooks = _.reject(state.notebooks, {id:action.notebookId});
      //We return the new state.
      return newState;
    }
      
    //We show the note's content using this action
    //active note Id is made the one which is clicked and is supposed to show it's content
    case SHOW:{
      return Object.assign({}, state, {activeNoteId:action.noteId});
    }
      
    //This is the delete note stuff
    //we assin the new state with notes, rejecting the one which carries an Id of deleted note
    //We return the new state after this modification
    case DELETEN:{
        const newState = _.clone(state)
        newState.notes = _.reject(state.notes,{id:action.noteId});
        return newState;
    }
      
    //We create a note by adding them to our list as per the action note.
    //we then sort the notes.
    case CREATEN: {
      const unsortedNotes = _.concat(state.notes, action.note);
      const notes = _.orderBy(unsortedNotes,'createdAt','desc');
      return _.assign({},state,{notes});
    }
      
    //We put the notes from the action
    case SEARCHED: {
      const searchedNotes = action.notes;
      const notebooks = action.tempNotebooks;
      return _.assign({},state,{searchedNotes});
    }
    default: return state;
  }
}

// Action creators
/* *** TODO: Put action creators here *** */
reducer.loadNotes = (notebookId) => {
  return (dispatch) => {
    api.get('/notebooks/'+notebookId+'/notes').then((notes) => {
      dispatch({type: UPDATE, notebookId, notes})
    })
  }
}

reducer.loadNoteContent = (noteId) => {
  return(dispatch) => {
    api.get('/notes/'+noteId).then((note) => {
      dispatch({type:SHOW, noteId})
    })
  }
}

reducer.resetNote = () => {
  return(dispatch) => {
    dispatch({type:RESETNOTE})
  }
}

reducer.resetNotebook = () => {
  return(dispatch) => {
    console.log('calling reset');
    dispatch({type:RESETNOTEBOOK})
  }
}

reducer.deleteNotebook = (notebookId) => {
  return(dispatch) => {
    api.delete('/notebooks/'+notebookId).then((notebook)=> {
      dispatch({type: DELETE, notebookId})
    })
  }
}

reducer.createNotebook = (newNotebook, callback) => {
  return(dispatch) => {
    api.post('/notebooks', newNotebook).then((notebook) => {
      dispatch({type: CREATE, notebook});
    });
  }
}

reducer.createNote = (newNote, callback) => {
  return(dispatch) => {
    api.post('/notes',newNote).then((note) => {
      dispatch({type:CREATEN, note});
    });
  }
}

reducer.deleteNote  =(noteId) => {
  return(dispatch) => {
    api.delete('/notes/'+noteId).then((note) => {
      dispatch({type:DELETEN, noteId})
    })
  }
}


reducer.onSearchNotes = (phrase) => {
  return(dispatch) => {
    api.get('/search/notes/'+phrase).then((notes) =>{

        const tempNotebooks = []

             notes.map((note) => {
                api.get('/notebooks/'+note.notebookId).then((notebook) => {
                  tempNotebooks.push(notebook);
                })
                console.log(tempNotebooks)
            })
            dispatch({type:SEARCHED, tempNotebooks, notes })

        })
      }
    }



// Export the action creators and reducer
module.exports = reducer;
