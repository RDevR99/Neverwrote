const React = require('react');
const MarkdownEditor = require('./MarkdownEditor');
const NoteEdit = require('./NoteEdit');

class NoteNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editing:false};
  }

  render() {
    const openEdit = () => {
      this.setState({editing:true});
    };

    const closeEdit = () => {
      this.setState({editing:false});
    }

    const createNote = (newNote) => {
      this.props.createNote(newNote, (err) => {
        if(!err) closeEdit();
      });
    };

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

module.exports = NoteNew;