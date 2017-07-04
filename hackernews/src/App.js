import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  }
]



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
      list: list,
      searchTerm: '',
    };

    //Bind is used to make it a class method.
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);

  }

  onSearchChange(event){
    this.setState({ searchTerm: event.target.value})
  }

  onDismiss(id) {
    // //Check if the item is id, and return if not true.
    // function isNotId(item) {
    //   return item.objectId !== id;
    // }
    const isNotId = item => item.objectID !== id;

    //How does a filter function work.
    // For every item on the list check if it's not the id.
    const updatedList = list.filter(isNotId);

    this.setState({ list: updatedList})
  }

  render() {
    const {searchTerm, list } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
        </div>
          <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
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
