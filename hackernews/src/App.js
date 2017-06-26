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
    };

    this.onDimiss = this.onDismiss.bind(this);
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
    return (
      <div className="App">
        {
          //For reach item in the list
            //ES6 function notation
          this.state.list.map(item =>
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
