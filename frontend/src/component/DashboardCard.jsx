import "../styles/DashboardCard.css";
import axios from "axios";
import React, { useState } from "react";

const DashboardCard = ({
  _id,
  posterSrc,
  name,
  tags,
  description,
  adopted,
}) => {
  const [isAdopted, setAdopted] = useState(adopted);
  const adoptPokemon = async (pokemonId) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const bearer = urlParams.get("bearer");
      const response = await axios.request({
        url:
          process.env.REACT_APP_API_BASE_URL +
          "/api/pokemon/adopt/" +
          pokemonId,
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
        method: "POST",
      });
      if (response.data.success) setAdopted(response.data.data.adopted);
    } catch (err) {
      console.error(error);
    }
  };
  return (
    <div className="card" key={_id}>
      <div className="poster">
        <img src={posterSrc} alt={name} />
      </div>
      <div className="details">
        <h1>{name}</h1>
        <div className="tags">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="tag"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="desc">{description}</p>
        <div
          className={`action ${isAdopted?"red":""}`}
          onClick={() => {
            isAdopted ? null : adoptPokemon(_id);
          }}
        >
          <span>{isAdopted == true ? "Adopted" : "Adopt"}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
