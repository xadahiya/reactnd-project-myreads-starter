import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link, Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books : [],
  }
  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({books})
      // console.log(this.state);
    })

  }

  updateBookShelf(book, shelf){

    console.log(book, shelf)
    BooksAPI.update(book, shelf).then((b) => {
      book.shelf = shelf
      this.setState((state) => ({
        books : this.state.books.filter((b) => {
          return b.id !== book.id
        }).concat([book])
      }))

    })


  }
  returnBooksFromState = (shelf) => {
    return (this.state.books.filter((book) => {
        return book.shelf === shelf
      }).map((book) => {
        return (


        <li key={book.id}>
        <div className="book">
        <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.thumbnail+ ')' }}></div>
        <div className="book-shelf-changer">
        <select value={book.shelf} onChange={(event) => {this.updateBookShelf(book, event.target.value)}}>
        <option value="none" disabled>Move to...</option>
        <option value="currentlyReading" >Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
        </select>
        </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors[0]}</div>
        </div>
        </li>

      )

      })
    )
  }

  render() {
    return (
      <div className="app">
          <Route path="/search" render={() => (
            <div className="search-books">
            <div className="search-books-bar">
            <Link className="close-search" to="/" >Close</Link>
            <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input type="text" placeholder="Search by title or author"/>

              </div>
              </div>
              <div className="search-books-results">
              <ol className="books-grid"></ol>
              </div>
              </div>
          )}/>

          <Route exact path="/" render={() => (

          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                  {
                    this.returnBooksFromState('currentlyReading')
                  }
                    </ol>

                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.returnBooksFromState('wantToRead')}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.returnBooksFromState('read')}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
