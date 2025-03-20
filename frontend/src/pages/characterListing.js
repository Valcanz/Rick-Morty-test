import { useState, useEffect } from "react";
import "../assets/custom.css";
import { Link } from "react-router";

const CharacterListing = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGraphQL = async () => {
      const query = `
        {
            characters {
                results {
                  id
                  name
                  status
                  species
                  gender
                }
              }
        }
      `;

      try {
        const response = await fetch("https://rickandmortyapi.com/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });

        const result = await response.json();
        setData(result.data.characters.results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGraphQL();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Rick and Morty Character</h2>
      <p>click each name to proceed to individual page</p>
      <ul>
        {data.map((char, index) => (
          <li className="char-list" key={index}>
            <Link to={`/character/${char.id}`}>
              <strong>{char.name}</strong>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterListing;
