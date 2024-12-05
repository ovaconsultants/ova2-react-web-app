import React from 'react';
import Tile from '../tile/tile';
import './tileContainer.scss';

const TileContainer = ({tilesData}) => { 
  return (
    <div className='container'>
      <div className='row'>   
      {tilesData?.map((tile, index) => (
        <Tile
          key={index}
          title={tile.title}
          description={tile.description}
          image={tile.image}
          roleName={tile.roleName}
          route={tile.route}
          data={tile.data}
        />
      ))}
      </div>
    </div>
  );
};

export default TileContainer;
