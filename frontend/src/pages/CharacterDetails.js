import { useParams, useLocation } from "react-router";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

const CharacterDetails = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    const fetchGraphQL = async () => {
      const query = `
            {
                character(id: ${params.id}) {
                      id
                      name
                      status
                      species
                      gender
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
        setData(result.data.character);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGraphQL();
  }, []);
  return (
    <>
      <div className="character-info">
        <div className="character-name">
          <h3>Name: </h3>
          <br />
          <strong>{data?.name}</strong>
        </div>
        <br />
        <br />
        <div className="character-status">
          <h3>Status: </h3>
          <br />
          <strong>{data?.status}</strong>
        </div>
        <br />
        <br />
        <div className="character-gender">
          <h3>Gender: </h3>
          <br />
          <strong>{data?.gender}</strong>
        </div>
        <br />
        <br />
        <div className="character-species">
          <h3>Species: </h3>
          <br />
          <strong>{data?.species}</strong>
        </div>
        <br />
        <br />
      </div>
      <QRCode value={`http://localhost:3000${location.pathname}`} size={256} />
    </>
  );
};

export default CharacterDetails;
