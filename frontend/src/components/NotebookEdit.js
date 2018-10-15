const React = require('react');
const _ = require('lodash');

//The NotebookEdit class is responsible for the handeling the input in the "Enter new Notebook input"
class NotebookEdit extends React.Component {
  constructor(props) {
    
    super(props);
    //The notebooks will be set to empty object if there is an empty notebook in props
    const notebook = props.notebook || {};
    this.state = {
      //We set the title to the notebook's title if there is already one or else an empty string.
      title: notebook.title || '',
    };
  }
	
  //We render the input box and define the functionalities that helps us to carry out the input 
  render() {
    
    //This fucntion is called when we press the cross button, which means we changed our mind about having a new notebook
    const revertAndStopEditing = (event) => {
      event.preventDefault();
      //The onCancel function will close the form, this will actually lead to dispatch a reducer.
      this.props.onCancel();
    };

    //This function is called when we have entered our Notebook name and want the notebook(when we press the green tick button)
    const submitAndStopEditing = (event) => {
	  
      event.preventDefault();
      //Creates a new Notebook object and saves it.
      const editedNotebook = _.assign({},this.props.notebook, {
        title: this.state.title
      });
      //The onSave is another function which takes the edited Notebook and will lead to an action dispatch to save teh notebook.
      this.props.onSave(editedNotebook);
      //After the save, we want to close the input, so we call onCancel for that.(the onCancel functionality is already described above) 
      this.props.onCancel();
    };

    
    //This is called when we change the input ,It is necessary for us to actually see our typings.
    const onTitleChange = (event) => {
      this.setState({title:event.target.value});
    };
	
    //We return an input form
    //With a green tick button to confirm a notebook creation
    //A cross button to revert back and cancel inputing
    //All the functionality are explained above.
    return (
        <div className="NotebookInput">
          <div className="input-group">

            <input className="form-control input-lg" value={this.state.title}
            placeholder="Notebook title" onChange={onTitleChange}
            />

            <div className="input-group-btn">

              <button className="btn btn-success btn-lg"
                onClick={submitAndStopEditing}
              >
              <i className="fa fa-check"></i>
              </button>

              <button className="btn btn-danger btn-lg"
                style={{marginRight: '12px'}}
                onClick={revertAndStopEditing}
              >
              <i className="fa fa-remove"></i>
              </button>
            </div>

          </div>
        </div>
    );
  }
}

//We export the NotebookEdit
module.exports = NotebookEdit;
