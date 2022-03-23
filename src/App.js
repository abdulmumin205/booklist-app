import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

const App = () => {
  const [book, setBook] = useState("");
  const [author, setAuthor] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!author && !book) {
      // no input value
      showAlert(true, "danger", "please enter value");
    } else if ((!author && book) || (author && !book)) {
      // when one input value is not fill
      showAlert(true, "danger", "fill in all the input values");
      setAuthor("");
      setBook("");
    } else if ((author && isEditing) || (book && isEditing)) {
      // when we click edit button
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, author: author, book: book };
          }
          return item;
        })
      );
      setAuthor("");
      setBook("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "item added to the list");
      const newItem = {
        id: new Date().getTime().toString(),
        author: author,
        book: book,
      };

      setList([...list, newItem]);
      setAuthor("");
      setBook("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const clearBooks = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };
  const removeBook = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };
  const editBook = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setAuthor(specificItem.author);
    setBook(specificItem.book);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <div className="container">
        <div className="heading">
          <h1>books to be read</h1>
        </div>

        <div className="form-control">
          <form onSubmit={handleSubmit}>
            {alert.show && (
              <Alert {...alert} removeAlert={showAlert} list={list} />
            )}
            <div className="form">
              <label htmlFor="author">author</label>
              <input
                type="text"
                name="author"
                value={author}
                placeholder="author"
                onChange={(e) => setAuthor(e.target.value)}
              />
              <label htmlFor="book">title</label>
              <input
                type="text"
                name="book"
                placeholder="book"
                value={book}
                onChange={(e) => setBook(e.target.value)}
              />
              <button className="form-btn">
                {isEditing ? "edit" : "submit"}
              </button>
            </div>
          </form>
        </div>

        {list.length > 0 && (
          <div className="book-list">
            <List books={list} removeBook={removeBook} editBook={editBook} />

            <button className="clear-books" onClick={clearBooks}>
              clear books
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default App;
