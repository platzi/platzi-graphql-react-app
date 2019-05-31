import React from "react";
import { useQuery, useMutation } from "urql";

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

function App() {
  const [{ fetching, error, data }] = useQuery({ query: BOOKS_QUERY });
  const [, likeBook] = useMutation(LIKE_BOOK);

  if (fetching || !data) {
    return <div>Carregando</div>;
  }
  if (error) {
    return <div>Erro</div>;
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
              <td>{b.likes}</td>
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
