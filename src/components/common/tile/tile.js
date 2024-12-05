import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import './tile.scss';
import { roleNameAtom } from '../../jotia/globalAtoms/userRelatedAtoms';

const Tile = ({ title, description, image, route, roleName=null, data }) => {
  const [isSelected, setIsSelected] = useState(false);
  const userRole = useAtomValue(roleNameAtom); 
  const navigate = useNavigate();


  const allowedRoles = (roleName || '').split(',').filter(Boolean);
  const shouldRenderTile = !userRole || allowedRoles.includes(userRole);
  const handleSelect = () => {
    setIsSelected(!isSelected);
    navigate(route, { state: { data } });
  };


  if (!shouldRenderTile) {
    return null;
  }

  return (
    <div className="col-6 col-sm-3 mb-3">
      <div
        className={`card tile ${isSelected ? 'tile--selected' : ''}`}
        onClick={handleSelect}
      >
        <h3 className="card-title tile__title">{title}</h3>
        <p className="card-text tile__description">{description}</p>
      </div>
    </div>
  );
};

export default Tile;
