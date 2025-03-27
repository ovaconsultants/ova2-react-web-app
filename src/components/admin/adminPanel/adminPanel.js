import React from "react";
import TileContainer from "../../common/tileContainer/tileContainer";
import { jobTilesData, ova2EtokenMainTile } from "../../../constants/tilesData";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleTileClick = (tile) => {
    if (tile.route) {
      navigate(tile.route);
    }
  };

  return (
    <div>
      <h4 className="text-center pt-4 pb-4">Admin Panel</h4>

      {/* Render Job Tiles */}
      <div>
        <TileContainer tilesData={jobTilesData} />
      </div>

      {/* Render Ova2-Etoken Main Tile */}
      <div className="tile-container">
        {ova2EtokenMainTile.map((tile, index) => (
          <div key={index} className="tile" onClick={() => handleTileClick(tile)}>
            <h3>{tile.title}</h3>
            <p>{tile.description}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
