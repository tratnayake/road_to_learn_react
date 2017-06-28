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

//ES5
// function isSearched(searchTerm){
//   return function(item){
//     //some condition which returns true or false
//     //return 0 OR item lower case position of actual search term lower case
//     console.log(searchTerm)
//     return !searchTerm || item.title.toLowerCase().includes(searchTerm.lowerCase());
//   }
// }

//ES6
//A function which takes in searchTerm and returns another function
// which takes in an item and either returns either 0 OR the index
const isSearched = (searchTerm) => (item) =>
  !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
  //!searchTerm = 0 OR 3 (i.e. whatever the corresponding element is)


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
    this.onDimiss = this.onDismiss.bind(this);

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
    const updatedList = this.state.list.filter(isNotId);

    this.setState({ list: updatedList})
  }

  render() {
    const {searchTerm, list } = this.state;
    return (
      <div className="App">
        <Search value={searchTerm} onChange={this.onSearchChange}>
          Search
        </Search>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

// class Search extends Component {
//   render(){
//     const {value, onChange, children } = this.props;
//     return (
//       <form>
//         {children}
//         <input
//           type="text"
//           value={value}
//           onChange={onChange}
//         />
//       </form>
//     );
//   }
// }
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

class Table extends Component {
  //First method should be a render
  render(){
    //Set up scope variables here.
    const { list, pattern, onDismiss } = this.props;
    return (
      <div>
        { list.filter(isSearched(pattern)).map(item =>
          <div key={item.objectId}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <Button onClick={() => onDismiss(item.objectID)}>
                Dismiss
              </Button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

class Button extends Component {
  render() {
    const {
      onClick,
      className ='',
      children,
    } = this.props;

    return (
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
      {children}
      </button>
    )
  }


}

export default App;
