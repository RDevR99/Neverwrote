const React = require('react');
const _ = require('lodash');

class NotebookEdit extends React.Component {
  constructor(props) {
    super(props);
    const notebook = props.notebook || {};
    this.state = {
      title: notebook.title || '',
    };
  }

  render() {
    const revertAndStopEditing = (event) => {
      event.preventDefault();
      this.props.onCancel();
    };

    const submitAndStopEditing = (event) => {

      event.preventDefault();
      //Creates a new Notebook object and saves it.
      const editedNotebook = _.assign({},this.props.notebook, {
        title: this.state.title
      });
      this.props.onSave(editedNotebook);
      this.props.onCancel();
    };

    const onTitleChange = (event) => {
      this.setState({title:event.target.value});
    };

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

module.exports = NotebookEdit;