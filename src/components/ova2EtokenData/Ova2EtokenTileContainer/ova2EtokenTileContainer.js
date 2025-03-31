import React from "react";
import { useNavigate } from "react-router-dom";

const Ova2EtokenTileContainer = ({ tilesData }) => {
  const navigate = useNavigate();

  const handleTileClick = (tile) => {
    if (tile.route) {
      navigate(tile.route);
    }
  };

  return (
    <div className="tile-container">
      {tilesData.map((tile, index) => (
        <div key={index} className="tile" onClick={() => handleTileClick(tile)}>
          <h3>{tile.title}</h3>
          <p>{tile.description}</p>
         </div>
      ))}
    </div>
  );
};

export default Ova2EtokenTileContainer;
