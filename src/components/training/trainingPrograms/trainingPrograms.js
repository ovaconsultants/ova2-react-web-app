import TileContainer from "../../common/tileContainer/tileContainer";
import {trainingTilesData} from '../../../constants/tilesData';

const TrainingProgram = () => {
    return (
        <div>
            <h4 className="text-center pt-4 pb-4">Training Programs</h4>
            <TileContainer tilesData={trainingTilesData} />
        </div>)
}
export default TrainingProgram;