import React from "react";
import { useNavigate } from "react-router-dom";
import "./ova2EtokenTileContainer.scss";
const Ova2EtokenTileContainer = ({ tilesData }) => {
  const navigate = useNavigate();

  const handleTileClick = (tile) => {
    if (tile.route) {
      navigate(tile.route);
    }
  };

  return (
    <div className="etoken-tile-container">
      {tilesData.map((tile, index) => (
        <div key={index} className="etoken-tile" onClick={() => handleTileClick(tile)}>
          <h3 className="etoken-tile-title">{tile.title}</h3>
          <p className="etoken-tile-description">{tile.description}</p>
         </div>
      ))}
    </div>
  );
};

export default Ova2EtokenTileContainer;
