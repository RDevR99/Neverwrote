const React = require('react');
const _ = require('lodash');
const MarkdownEditor = require('./MarkdownEditor');

//The NoteEdit class will be responsible for handeling the editing that happends while creating a note.
class NoteEdit extends React.Component {
  //The constructor for NoteEdit
  constructor(props) {
    super(props);
    //The note constant that stores the note passed in props or else an empty object in absence of the note
    const note = props.note || {};

    //The state stores the title, content and the notebookId, in absence of those, it stores an empty string in them.
    this.state = {
      title: note.title || '',
      content: note.content || '',
      notebookId: props.notebookId || ''
    };
  }

  //This is where the Editing is rendered and facilitated
  render() {
    
    //This is the function which is called when we press the cross button, i.e. when we change our mind about adding a note.
    const revertAndStopEditing = (event) => {
      event.preventDefault();
      //The onCancel is passed to NoteEdit as props, It will lead to dispatching action that cancels editing
      this.props.onCancel();
    };
	
    //The submitAndStopEditing function is called when we press the green tick button, meaning that we are done editing and wanna finalize the note
    const submitAndStopEditing = (event) => {
      event.preventDefault();
      //Edited post is the note that we make and assign a brand new title, content and notebookId
      const editedPost = _.assign({}, this.props.note, {
        title: this.state.title,
        content: this.state.content,
        notebookId: this.props.notebookId
      });
	
      //this.props.onSave takes an argument as the new note we created and adds its via dispatching an action further on.
      this.props.onSave(editedPost);
      //Finally we call onCancel to close the editing.
      this.props.onCancel();
    };
	
    
    //This function is called when we change something in the input of the title area for the new note and press the green tick button.
    const onTitleChange = (event) => {
      //We set the state to the title of the newly entered title.
      this.setState({title: event.target.value});

    };
	
    //This function is called when we make changes to the text area for the content and press the green tick button.
    const onContentChange = (event) => {
      //We set the state to the content that we just entered
      this.setState({content: event.target.value});
    };
    
    
	//We return a form
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
