import React, { useState , useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './trainingDetail.scss';  // Custom styles for tabs
import { useLocation , useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Tabs, Tab, Row, Col } from 'react-bootstrap';  // Importing Tabs, Tab, Row, and Col from react-bootstrap

const TrainingDetail = () => {
  const navigate = useNavigate();
  const { courseName } = useParams();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const locationData = location?.state?.data;
    if (locationData) {
      setData(locationData);
      localStorage.setItem("trainingData", JSON.stringify(locationData));
    } else {
      const savedData = localStorage.getItem("trainingData");
      if (savedData) {
        setData(JSON.parse(savedData));
      }
    }
  }, [location]);

  const handleSelect = (key) => {
    setActiveTab(key);
  };

  const handleEnrollNow = () => {
    if (data) {
      localStorage.setItem("trainingData", JSON.stringify(data));
    }
    navigate(`/training/${courseName}/enroll`, { state: { data } });
  };


  return (
    <div className="container training-schedule-container text-start">
      <h4 className="text-center mb-4 training-schedule-title">{data?.title}</h4>
      
      {/* Row to contain tabs */}
      <Row className="mb-3">
        <Col>
          <Tabs 
            activeKey={activeTab} 
            onSelect={handleSelect} 
            className="flat-tabs"  // Custom class for flat tabs
            fill  // Make tabs span full width
          >
            {data?.weeks?.map((week, index) => (
              <Tab eventKey={index} key={index} title={`Week ${index + 1}`}>
                {/* Week Content */}
                <div className="week-card p-3">
                  <h5 className="week-title pt-2">{week.title}</h5>
                  {/* <h6 className="objective-title">Objective</h6> */}
                  <p className="week-objective">{week.objective}</p>
                  
                  <h5 className="description-title">Description</h5>
                  <ul className="week-description">
                    {week.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  
                  <h5 className="assignments-title">Assignments</h5>
                  <ul className="week-assignments">
                    {week.assignments.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Tab>
            ))}
          </Tabs>
        </Col>
      </Row>

      {/* Enroll Now Button */}
      <div className="row mt-4">
        <div className="col text-center pb-4">
          <button className="btn btn-primary enroll-btn" onClick={handleEnrollNow}>Enroll Now</button>
        </div>
      </div>
    </div>
  );
};

export default TrainingDetail;

//
