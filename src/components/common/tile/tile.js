import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './tile.scss';
const Tile = ({ title, description, image, route, data }) => {
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();
  const handleSelect = () => {
    setIsSelected(!isSelected);
    navigate(route, { state: { data } });
  };

  return (
    <div className="col-6 col-sm-3 mb-3">
      <div className={`card tile ${isSelected ? 'tile--selected' : ''}`} onClick={handleSelect} >
        {/* <div className="card-body"></div> */}
        <h3 className="card-title tile__title">{title}</h3>
        <p className="card-text tile__description">{description}</p>
      </div>
    </div>
  );
};

export default Tile;
