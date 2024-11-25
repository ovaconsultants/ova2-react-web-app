import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import './tile.scss';
import { roleNameAtom } from '../../jotia/globalAtoms/userRelatedAtoms';

const Tile = ({ title, description, image, route, roleName, data }) => {
  const [isSelected, setIsSelected] = useState(false);
  const userRole = useAtomValue(roleNameAtom);
  const navigate = useNavigate();

  // Split roleName into an array for easier validation
  const allowedRoles = (roleName || '').split(',');
  console.log("this is the allowed roles " ,roleName);

  const handleSelect = () => {
    setIsSelected(!isSelected);
    navigate(route, { state: { data } });
  };

  // Only render if the user's role is allowed
  if (!allowedRoles.includes(userRole)) {
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
