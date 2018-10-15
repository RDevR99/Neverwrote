const React = require('react');
const MarkdownEditor = require('./MarkdownEditor');
const NoteEdit = require('./NoteEdit');


//NoteNew handles the adding of a new Note,It provides an add New Note button.
//It uses editing functinality from NoteEdit and handovers the task of creating the note.
class NoteNew extends React.Component {
  constructor(props) {
    
    super(props);
    //The state has editing set initially to false..
    this.state = {
      editing:false,

    };
  }

  //Following contains everything needed to add the add new note button
  render() {
    
    //This function is the one which is called when we press the button.
    //It will set the editing in the state to true.
    //Setting a new state will invoke re-render
    //This will now follow the flow in the render() function and will execute the if statement below
    //It will satisdy the if condition and the block under if will be executed.
    const openEdit = () => {
      this.setState({editing:true});
    };

    
    //This is the function which will be called when we are done editing or changed our mind about a new Note, so it will help us to get rid of the editor after it has done its work
    const closeEdit = () => {
      this.setState({editing:false});
      //clearInput in here was passed as props!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      this.props.clearInput();

    }
	
    
    //createNote is the function which passes the new note for dispatching action to actualy creating a note.
    //It id called when we click the save button of editor. It is passed as a props to the editor.
    const createNote = (newNote) => {
      //If we are successful in creating the note,we close editing.
      this.props.createNote(newNote, (err) => {
        if(!err) closeEdit();
      })
    };
	
    
    //This if statements helps us doing conditional rendering, if the state is changed to {editing:true}
    //Then we will pass the NoteEdit component, basically the editor.
    if(this.state.editing) {

      return (
        <NoteEdit
          note={this.props.note}
          onSave={createNote}
          onCancel={closeEdit}
          notebookId={this.props.notebookId}
        />
      );
    }
	
    //If we are not editing or creating, we will show the button to provide the option to 
    //add a new note.
    return (
      <button className="new-note btn btn-primary"
        onClick={openEdit}
      >
      <i className="new-notebook-button-plus fa fa-plus"></i>
      Note
      </button>
    );
  }
}

//We export the new note
module.exports = NoteNew;
