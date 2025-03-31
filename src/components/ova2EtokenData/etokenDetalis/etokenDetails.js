// src/components/ova2EtokenData/etokenDetalis/etokenDetails.js
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EtokenDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const etokenInfo = location.state?.data;
    if (etokenInfo?.link && Object.keys(etokenInfo).length === 2) {
      window.open(etokenInfo.link, "_blank");
    }
    navigate("/admin/ova2-etoken");
  }, [location, navigate]);

  return null;
};

export default EtokenDetails;