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
        <form>
          <input type="text" onChange={this.onSearchChange} />
          </form>
        { list.filter(isSearched(searchTerm)).map(item =>
          //For reach item in the list
            //ES6 function notation
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={() => this.onDismiss(item.objectID)}
                type="button"
              >
                Dismiss
              </button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default App;
