import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaUserTie,
  FaStore,
  FaUsers,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaHandshake,
} from "react-icons/fa";
import "./userGuide.scss";
import Employee from "./employee";
import Vendor from "./vendor";
import Client from "./client";
import Trainee from "./trainee";
import Educator from "./educator";
import Consultant from "./consultant";

const topics = [
  { id: "employee", title: "Employee", route: "employee", icon: <FaUserTie /> },
  { id: "vendor", title: "Vendor", route: "vendor", icon: <FaStore /> },
  { id: "client", title: "Client", route: "client", icon: <FaHandshake /> },
  { id: "trainee", title: "Trainee", route: "trainee", icon: <FaUsers /> },
  {
    id: "educator",
    title: "Educator",
    route: "educator",
    icon: <FaGraduationCap />,
  },
  {
    id: "consultant",
    title: "Consultant",
    route: "consultant",
    icon: <FaChalkboardTeacher />,
  },
];

const UserGuide = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTopic, setActiveTopic] = useState(null);
  const navigate = useNavigate();

  const handleNavigation = (topic) => {
    setActiveTopic(topic);
    navigate(topic.route);
  };

  return (
    <>
      {/* Sidebar Layout */}
      <div className="app-layout">
        <div className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
          <button
            className="toggle-btn"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            <FaBars />
          </button>

          <h2 className="sidebar-title">
            {!isSidebarCollapsed && "Help Topics"}
          </h2>

          <ul className="topic-list">
            {topics.map((topic) => (
              <li key={topic.id}>
                <button
                  className={`topic-btn ${
                    activeTopic?.id === topic.id ? "active" : ""
                  }`}
                  onClick={() => handleNavigation(topic)}
                >
                  {topic.icon}
                  {!isSidebarCollapsed && <span>{topic.title}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="content2">
          <div className="welcome-container">
            <Routes>
              <Route path="employee" element={<Employee />} />
              <Route path="vendor" element={<Vendor />} />
              <Route path="client" element={<Client />} />
              <Route path="trainee" element={<Trainee />} />
              <Route path="educator" element={<Educator />} />
              <Route path="consultant" element={<Consultant />} />
              <Route path="/" element={<Welcome />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

const Welcome = () => (
  <div className="content1">
    <div className="welcome-container">
      <h1 className="text-start fw-bold mb-4">Welcome to the User Guide</h1>

      <p className="fs-6">
        This guide provides clear instructions to help you navigate through our
        platform efficiently. Whether you are an{" "}
        <strong>Employee, Vendor, Client, Trainee, Educator,</strong> or{" "}
        <strong>Consultant</strong>, you will find structured steps and relevant
        details to assist you.
      </p>

      <div className="info-section p-3 border border-dark rounded mb-4">
        <h3 className="fw-bold">How to Use This Guide?</h3>
        <ul className="list-unstyled mt-2">
          <li>
            ✔ Use the <strong>left sidebar</strong> to explore various sections.
          </li>
          <li>✔ Click on a topic to access step-by-step instructions.</li>
          <li>✔ Follow the provided guidance for better understanding.</li>
        </ul>
      </div>

      <div className="info-section p-3 border border-dark rounded mb-4">
        <h3 className="fw-bold">What You'll Find Here?</h3>
        <ul className="list-group list-group-flush mt-2">
          <li className="list-group-item border-bottom">
            <strong>Employee Registration:</strong> Instructions for signing up.
          </li>
          <li className="list-group-item border-bottom">
            <strong>Vendor Guide:</strong> Steps to register as a vendor.
          </li>
          <li className="list-group-item border-bottom">
            <strong>Client Assistance:</strong> Guide for managing services.
          </li>
          <li className="list-group-item border-bottom">
            <strong>Trainee Enrollment:</strong> Enrollment process details.
          </li>
          <li className="list-group-item border-bottom">
            <strong>Educator Guidelines:</strong> Information on course
            creation.
          </li>
          <li className="list-group-item">
            <strong>Consultant Support:</strong> Steps to provide guidance
            effectively.
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default UserGuide;
