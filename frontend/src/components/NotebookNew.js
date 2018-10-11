const React = require('react');
const NotebookEdit = require('./NotebookEdit');

/**
 * A button that expands  into a form when it is clicked
 */

class NotebookNew extends React.Component{
  constructor(props) {
    super(props);
    //set the intital interanl state for this ocmpoentne
    this.state = {editing:false};
  }

  render() {
    const openEdit = () => {
      this.setState({editing: true});
    };

    const closeEdit = () => {
      this.setState({editing: false});
    };

    const createNotebook = (newNotebook) => {
      this.props.createNotebook(newNotebook, (err) => {
        if(!err) closeEdit();
      });
    };


    if(this.state.editing) {

      return (
        <NotebookEdit
          notebook = {this.props.notebook}
          onSave={createNotebook}
          onCancel={closeEdit}
        />
      );
    }

    return(
      <button className="new-notebook-button btn btn-primary" onClick={openEdit}>
        <i className="new-notebook-button-plus fa fa-plus"></i>
         Notebook
      </button>
    );
  }
}

module.exports = NotebookNew;