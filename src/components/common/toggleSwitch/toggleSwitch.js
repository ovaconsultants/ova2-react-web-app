import React from "react";
import "./toggleSwitch.scss";

const ToggleSwitch = ({ isOn, onToggle }) => {
  return (
    <div
      className={`toggle-switch ${isOn ? "on" : "off"}`}
      onClick={onToggle}
    >
      <span className="toggle-label">{isOn ? "A" : "D"}</span>
      <div className="toggle-slider"></div>
    </div>
  );
};

export default ToggleSwitch;
