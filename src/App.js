import React, { useState } from "react";
import { useQuery, useMutation, useSubscription } from "urql";

const BOOKS_QUERY = `
query {
  books {
    id
    title
    year
    rating
    likes
    image
    author {
      name
    }
  }
}
`;

const LIKE_BOOK = `
mutation LikeBook($id: Int!) {
  likeBook(input: { id: $id }) {
    success
  }
}
`;

const BOOK_SUBSCRIPTION = `
subscription {
  bookChanged {
    id
    title
    likes
  }
}
`;

function App() {
  const [updatedBooks, setUpdatedBooks] = useState({});
  const [{ fetching, error, data }] = useQuery({ query: BOOKS_QUERY });
  const [, likeBook] = useMutation(LIKE_BOOK);
  useSubscription({ query: BOOK_SUBSCRIPTION }, (_, evt) => {
    setUpdatedBooks({
      ...updatedBooks,
      [evt.bookChanged.id]: evt.bookChanged
    });
  });

  const getCurrentLikes = book => {
    const updatedBook = updatedBooks[book.id];
    if (!updatedBook) {
      return book.likes;
    }
    return updatedBook.likes;
  };
  if (error) {
    return <div>Erro</div>;
  }
  if (fetching || !data) {
    return <div>Carregando</div>;
  }
  return (
    <div>
      <h1>Livros</h1>
      <table>
        <thead>
          <tr>
            <th />
            <th>Autor</th>
            <th>Título</th>
            <th>Ano</th>
            <th>Nota</th>
            <th>Curtidas</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data.books.map(b => (
            <tr key={b.id}>
              <td>
                <img src={b.image} alt={b.title} />
              </td>
              <td>{b.author.name}</td>
              <td>{b.title}</td>
              <td>{b.year}</td>
              <td>{b.rating}</td>
              <td>{getCurrentLikes(b)}</td>
              <td>
                <button onClick={() => likeBook({ id: b.id })}>Curtir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
