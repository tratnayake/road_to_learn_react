import React, { Component } from 'react';
import './App.css';

//API details
const DEFAULT_QUERY = 'redux'

const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;




//ES6
//A function which takes in searchTerm and returns another function
// which takes in an item and either returns either 0 OR the index
const isSearched = (searchTerm) => (item) =>
  !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());


//App extends from the Component class of React
class App extends Component {

  //Set up the props
  constructor(props){
    //User Super to get the props from the parent class because this is extending
    //extending parent class.
    super(props);
    //THe state is going to have the list defined above.
    this.state = {
      result: null,
      searchTerm: '',
    };

    //Bind is used to make it a class method.
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);

  }

  setSearchTopstories(result) {
    console.log(result);
    this.setState({ result })
  }

  fetchSearchTopstories(searchTerm) {
    fetch(url)
    .then(response => response.json())
    .then(result => this.setSearchTopstories(result));
  }

  //As soon as this component ismounted, fetch from API
  componentDidMount(){
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm);
  }

  onSearchChange(event){
    this.setState({ searchTerm: event.target.value})
  }

  onDismiss(id) {
    // //Check if the item is id, and return if not true.
    // function isNotId(item) {
    //   return item.objectId !== id;
    // }

    //Return anything that's NOT the dismissed ID
    const isNotId = item => item.objectID !== id;

    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      //Take the existing result object, into hits element, put the updatedHits
      result: { ...this.state.result, hits: updatedHits }
    })

    // //How does a filter function work.
    // // For every item on the list check if it's not the id.
    // const updatedList = list.filter(isNotId);
    //
    // this.setState({ list: updatedList})
  }

  render() {
    const {searchTerm, result } = this.state;

    if (!result) {return null; }

    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
        </div>
        { result && <Table
            list={result.hits}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
        }

      </div>
    );
  }
}


//Refactored to be Functional Stateless
const Search = ({ value, onChange, children }) =>
  <form>
    {children}
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
  </form>


//Refactored
const Table = ({list, pattern, onDismiss}) =>
<div className="table">
  { list.filter(isSearched(pattern)).map(item =>
    <div key={item.objectID} className="table-row">
      <span style={{ width: '40%' }}>
        <a href={item.url}>{item.title}</a>
      </span>
      <span style={{ width: '30%'}}>
        {item.author}
      </span>
      <span style={{ width: '10%' }}>
        {item.num_comments}
      </span>
      <span style={{ width: '10%' }}>
        {item.points}
      </span>
      <span style={{ width: '10%' }}>
      <Button
        onClick={() => onDismiss(item.objectID)}
        className="button-inline"
      >
        Dismiss
        </Button>
      </span>
    </div>
  )}
</div>



//Refactored
const Button = ({onClick, className, children}) =>
<button
  onClick={onClick}
  className={className}
  type="button"
>
{children}
</button>

export default App;
