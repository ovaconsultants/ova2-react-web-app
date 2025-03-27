import React from "react";
import Ova2EtokenTileContainer from "../Ova2EtokenTileContainer/ova2EtokenTileContainer";
import { EtokenTilesData } from "../../../constants/tilesData";

const Etoken = () => {
  return (
    <div className="clients-tiles">
      <h4 className="text-center pt-4 pb-4">Ova2 Etoken App Details</h4>
      <Ova2EtokenTileContainer tilesData={EtokenTilesData} />
    </div>
  );
};

export default Etoken;
