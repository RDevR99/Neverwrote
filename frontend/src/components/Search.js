const React = require('react');
const _ = require('lodash');
const NoteNew = require('./NoteNew')

class Search extends React.Component{

  constructor(props){

    super(props);

    //const createNote = props.createNote;
    //const activeNotebookId = props.activeNotebookId;
    //const notes = props.notes;

    this.state = {
        phrase:'',
        tempNotes:[],
    };
  }

  render() {

    const clearInput = () => {
      this.setState({
        phrase:''
      });
    };

    const onSearching = (event) => {
		//The setState is somehow not updating hte phrase/
		//alert(event.target.value);//This is showing some values
		const phrase = event.target.value;

		this.setState({phrase});
    //resetSearchbar();
		//onSearch(this.state.phrase);

    //
		onSearch(phrase);
		//right now we can make seargch as you type we can implement a button too
    };

    const onSearch = (phrase) => {

        const tempNotes=[];
        console.log(this.props.notes);
        this.props.notes.map(note => {
            console.log('hi');
          //the problem is with phrases
          if(note.title.contains(phrase))
          {
            console.log('hi again');
            tempNotes.push(note);
          }
          else if(

              ((note.title.search(phrase)) === (-1))

              &&

              ((note.content.search(phrase)) === (-1))

          )
          {  }
          else
          {
              tempNotes.push(note);
          }
          //we first need notes in its state
          //this will create anoter notes, array of note (IDs of whom to display)
        })
        //It will return an array of notes
        //And instead of directly mapping from notes state to create notes, we use this array to map notes
        this.setState({tempNotes});
        console.table(tempNotes);

   }



    return(
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
                  <NoteNew createNote ={this.props.createNote} notebookId={this.props.activeNotebookId}/>
                  </h3>

                  <ol>
                    {this.state.tempNotes.map(this.props.createNote)}
                  </ol>

        </div>

  </div>

    );

  }
}

module.exports = Search;