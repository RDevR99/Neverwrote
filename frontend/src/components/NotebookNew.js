const React = require('react');
const NotebookEdit = require('./NotebookEdit');

/**
 * A button that expands  into a form when it is clicked
 */

class NotebookNew extends React.Component{
  constructor(props) {
    super(props);
    //set the intital interanl state for this component
    //Editing is false, to avoid poping up input form without it being requried
    this.state = {editing:false};
  }

  render() {
    //This function is called when we press on the create Notebook button 
    const openEdit = () => {
      //It sets editing in the state to true, which calls for a re-render and the if statement below will execute the block under it.
      this.setState({editing: true});
    };
	
    //This function is called when we press the Tick button, or close button, It is necessary to remove the input box.
    const closeEdit = () => {
      this.setState({editing: false});
    };

    //This function is called when the notebook is entered and save button is clicked, thus passing the newNotebook.
    const createNotebook = (newNotebook) => {
      //If we create Notebook successfully, then we close editing.
      this.props.createNotebook(newNotebook, (err) => {
        if(!err) closeEdit();
      });
    };


    if(this.state.editing) {
	  //This facilitates conditional rendering, only pops up if we want to edit, if we press the add new notebook button.
      return (
        <NotebookEdit
          notebook = {this.props.notebook}
          onSave={createNotebook}
          onCancel={closeEdit}
        />
      );
    }
	
    //It will anyway return a button to add new notebook which on clicking opens up the editing box.
    return(
      <button className="new-notebook-button btn btn-primary" onClick={openEdit}>
        <i className="new-notebook-button-plus fa fa-plus"></i>
         Notebook
      </button>
    );
  }
}

//We export the NotebookNew
module.exports = NotebookNew;
