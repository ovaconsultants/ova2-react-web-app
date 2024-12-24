import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Importing components
import Home from "../home/home";
import Service from "../service/service";
import Contact from "../contact/contact";
import PortfolioSingle from "../portfolio/portfolioSingle/portfolioSingle";
import ContactDetails from "../admin/contactDetails/contactDetails";
import Projects from "../projects/projects";
import Login from "../login/login";
import { AuthProvider } from "../../AuthContext";
import ProtectedRoute from "../../ProtectedRoute";
import JobPosting from "../admin/jobPosting/jobPosting";
import Jobs from "../jobs/jobs";
import JobApplicants from "../admin/jobApplicants/jobApplicants";
import AdminPanel from "../admin/adminPanel/adminPanel";
import JobDetails from "../admin/jobDetails/jobDetails";
import Job from "../job/job";
import TrainingProgram from "../training/trainingPrograms/trainingPrograms";
import TrainingDetail from "../training/trainingDetail/trainingDetail";
import SignUp from "../signUp/signUp";
import Users from "../users/users";
import UserEdit from "../userEdit/userEdit";
import UserSearch from "../userSearch/userSearch";
import Profile from "../admin/profile/profile";
import VendorSignUp from "../admin/vendorSignUp/vendorSignUp";
import Vendor from "../admin/vendor/vendor";
import GeneratePaySlip from "../admin/generatePaySlip/generatePaySlip";
import PaySlip from "../paySlip/paySlip";
import CompanyEditableDetails from "../admin/companyEditableDetails/companyEditableDetails";
import SalaryDetails from "../salaryDetails/salaryDetails";
import PaySlipYear from "../../paySlipYear/paySlipYear";
import ForgotPassword from "../forgotPassword/forgotPassword";
import ContactQueryDetails from "../admin/contactQueryDetails/contactQueryDetails";
import TrainingProgramEnrollmentForm from "../training/trainingProgramEnrollment/trainingProgramEnrollmentForm";
import CourseEnrollementDetails from "../admin/course-enrolement-details/course-enrolement-details";
import Clients from "../clientsData/clients/clients";
import ClientDetails from "../clientsData/clientDetails/clientDetails";

const Navigation = () => {
  return (

    <Routes>
      {/* -------------------------- Public Routes -------------------------- */}
      
      {/* Home and General Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<Home />} />
      <Route path="/service" element={<Service />} />

      {/* Training and Projects */}
      <Route path="/training" element={<TrainingProgram />} />
      <Route path="/training/:courseName" element={<TrainingDetail />} />
      <Route path="/training/:courseName/enroll" element={<TrainingProgramEnrollmentForm />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/portfolio-single" element={<PortfolioSingle />} />

      {/* Contact and FAQs */}
      <Route path="/faq" element={<Contact />} />
      <Route path="/pricing" element={<Contact />} />
      <Route path="/contact" element={<Contact />} />

       {/* Clients */}
      <Route path="/clients" element={<Clients />} />
      <Route path="/clients/:clientName" element={<ClientDetails />} />

      {/* Job Listings and Details */}
      <Route path="/in/jobs" element={<Jobs country="India" />} />
      <Route path="/us/jobs" element={<Jobs country="USA" />} />
      <Route path="/job/:jobId" element={<Job />} />

      {/* Authentication Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/password-recovery" element={<ForgotPassword />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/search" element={<UserSearch />} />



      {/* ------------------------ Protected Admin Routes ------------------------ */}

      {/* Admin Panel and Protected Routes */}
      <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      {/* Admin Job and Contact Details */}
      <Route path="/admin/contact-details" element={<ProtectedRoute><ContactDetails /></ProtectedRoute>} />
      <Route path="/admin/job-posting" element={<ProtectedRoute><JobPosting /></ProtectedRoute>} />
      <Route path="/admin/job-applicants" element={<ProtectedRoute><JobApplicants /></ProtectedRoute>} />
      <Route path="/admin/job-details" element={<ProtectedRoute><JobDetails /></ProtectedRoute>} />

      {/* Admin Pay Slips and User Management */}
      <Route path="/admin/pay-slip" element={<ProtectedRoute><GeneratePaySlip /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
      <Route path="/admin/users/user-details" element={<UserEdit />} />

      {/* Admin Contact Queries and Enrollment Details */}
      <Route path="/admin/contact-query-details" element={<ProtectedRoute><ContactQueryDetails /></ProtectedRoute>} />
      <Route path="/admin/enrollement-details" element={<ProtectedRoute><CourseEnrollementDetails /></ProtectedRoute>} />

      {/* Admin Vendor Management */}
      <Route path="/admin/vendor" element={<ProtectedRoute><Vendor /></ProtectedRoute>} />
      <Route path="/admin/vendor/vendor-details" element={<ProtectedRoute><CompanyEditableDetails /></ProtectedRoute>} />

      {/* Vendor Sign-Up (Non-Protected) */}
      <Route path="/admin/sign-up-client" element={<VendorSignUp />} />



      {/* ------------------------- Salary and Pay Slip Routes ------------------------ */}
      <Route path="/pay-slip-years/pay-slip-months/pay-slip-details/" element={<SalaryDetails />} />
      <Route path="/pay-slip-years/" element={<PaySlipYear />} />
      <Route path="/pay-slip-years/pay-slip-months" element={<PaySlip />} />



      {/* -------------------------- Default Route -------------------------- */}
      <Route path="/pay-slip-years/" element={<PaySlipYear/>} />
      <Route path="/pay-slip-years/pay-slip-months" element = {<PaySlip/>}/>
      <Route path="/admin/vendor"  element={<Vendor/>}/>
      <Route path="/admin/vendor/vendor-details" element={<CompanyEditableDetails />}/>
      {/* <Route path="/hr/anjalitomar" element={<Navigate to={<HrPortfolio/>} />} /> */}
      {/* <Route path="/hr/anjalitomar" element={<Navigate to="/portfolio/html/index.html" replace />} /> */}
      
      <Route path="*" element={<Navigate to="/" />} />
    
    </Routes>
  );
};

export default Navigation;
