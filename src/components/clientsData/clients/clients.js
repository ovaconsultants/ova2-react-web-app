import TileContainer from "../../common/tileContainer/tileContainer";
import {ClientsTilesData} from '../../../constants/tilesData';

const Clients = () => {
    return (
        <div className="clients-tiles">
          <h4 className="text-center pt-4 pb-4">Clients Details</h4>
          <TileContainer tilesData={ClientsTilesData} />
        </div>
      );
    };

export default Clients;