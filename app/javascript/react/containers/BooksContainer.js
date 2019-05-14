import React, { Component } from 'react'
import { Link } from 'react-router'

import Book from '../components/Book'
import NavBar from '../components/NavBar'
import SVGBookshelf from '../components/SVGBookshelf'

class BooksContainer extends Component {
  constructor(props) {
    super(props);
    this.state={
      user: {},
      books: []
    }
    this.setBookColor = this.setBookColor.bind(this);
    this.setBookWidth = this.setBookWidth.bind(this);
    this.setOnBookClick = this.setOnBookClick.bind(this);
  }

  componentDidMount() {
    fetch('/api/v1/books')
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status}(${response.statusText})` ,
          error = new Error(errorMessage);
          throw(error);
        }
        })
        .then(response => response.json())
        .then(body => {
          this.setState({user: body.user, books: body.books})
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  setOnBookClick() {
  }

  setBookColor(value) {
    let colorIndex = ["blue", "pink", "green", "yellow"]
    return colorIndex[value%4]
  }

  setBookWidth(value) {
    let widthIndex = [
      "blue", "pink", "green", "yellow", "blue", "pink", "green", "yellow", "blue", "green"
    ]
    return widthIndex[value%10]
  }

  render() {
    let bookArray = this.state.books.map(book => {
      // width={this.setBookWidth(book.id)}

      // colorIndex={this.setBookColor(book.id)}
      return (
        <div className={`book-contents ${this.setBookColor(book.id)}`}>
          <Book
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
          />
        </div>
      )
    })

    return(
      <div>
        <h1 className="page-header">
          Select a Book!
        </h1>
        <div className="bookshelf-content">
        {bookArray}
        </div>
        <div>
        <SVGBookshelf/>
        </div>
        <NavBar/>
      </div>
    )
  }
}

export default BooksContainer
