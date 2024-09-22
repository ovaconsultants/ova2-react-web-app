import TileContainer from "../../common/tileContainer/tileContainer";
import {jobTilesData} from '../../../constants/tilesData';
import InternInformationForm from "../../pdf/internInformationForm/internInformationForm";

const AdminPanel = () => {
    const handleGeneratePDF = async () => {
        await InternInformationForm(); // Call the function to generate the PDF
      };
    return (
        <div>
            <h4 className="text-center pt-4 pb-4">Admin Panel</h4>
            {/* <div>
      <h1>Generate Editable PDF Form</h1>
      <button onClick={handleGeneratePDF}>Generate PDF</button>
    </div> */}
            <TileContainer tilesData={jobTilesData} />
        </div>)
}
export default AdminPanel;