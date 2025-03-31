import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ClientDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const clientInfo = location.state?.data;
    if (clientInfo?.link && Object.keys(clientInfo).length === 2) {
      window.open(clientInfo.link, "_blank");
      navigate("/clients");
    } else {
      navigate("/clients");
    }
  }, [location, navigate]);

  return null;
};

export default ClientDetails;
