import React from "react";

const List = ({ removeBook, editBook, books }) => {
  return (
    <div>
      {books.map((item) => {
        const { id, author, book } = item;
        return (
          <div className="book" key={id}>
            <div className="item">
              <p className="p1">{author} </p>
              <p className="p2"> {book}</p>
            </div>

            <div className="list-btn">
              <p className="edit" onClick={() => editBook(id)}>
                edit
              </p>
              <p className="delete" onClick={() => removeBook(id)}>
                delete
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
