import React from "react";
import { useQuery } from "urql";

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

function App() {
  const [{ fetching, error, data }] = useQuery({ query: BOOKS_QUERY });
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
              <td />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
