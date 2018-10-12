const React = require('react');
const _ = require('lodash');
const MarkdownEditor = require('./MarkdownEditor');

class NoteEdit extends React.Component {
  constructor(props) {
    super(props);
    const note = props.note || {};

    this.state = {
      title: note.title || '',
      content: note.content || '',
      notebookId: props.notebookId || ''
    };
  }

  render() {
    const revertAndStopEditing = (event) => {
      event.preventDefault();
      this.props.onCancel();
    };

    const submitAndStopEditing = (event) => {
      event.preventDefault();
      const editedPost = _.assign({}, this.props.note, {
        title: this.state.title,
        content: this.state.content,
        notebookId: this.props.notebookId
      });

      this.props.onSave(editedPost);
      this.props.onCancel();
    };

    const onTitleChange = (event) => {
      this.setState({title: event.target.value});

    };

    const onContentChange = (event) => {
      this.setState({content: event.target.value});
    };

    return(
      <form className="blog-post">

        <div className="form-group">
          <input className="form-control input-lg" value={this.state.title}
            placeholder="Note title" onChange={onTitleChange}
            />
          <MarkdownEditor value={this.state.content} onChange={onContentChange} />
        </div>

        <button className="ButnN btn btn-danger pull-right btn-lg"
          style={{marginRight: '12px'}}
          onClick={revertAndStopEditing}
        >
          <i className="fa fa-remove"></i>
        </button>

        <button className="ButnN btn btn-success pull-right btn-lg"
        onClick={submitAndStopEditing}
        >
          <i className="fa fa-check"></i>
        </button>

    </form>
    );
  }
}

module.exports = NoteEdit;