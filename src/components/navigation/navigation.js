import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../home/home';
import Service from '../service/service';
import Contact from '../contact/contact';
import PortfolioSingle from '../portfolio/portfolioSingle/portfolioSingle';
import ContactDetails from '../admin/contactDetails/contactDetails';
import Projects from '../projects/projects';
import Login from '../login/login';
import { AuthProvider } from '../../AuthContext';
import ProtectedRoute from '../../ProtectedRoute';
import JobPosting from '../admin/jobPosting/jobPosting';
import Jobs from '../jobs/jobs';
import JobApplicants from '../admin/jobApplicants/jobApplicants';
import AdminPanel from '../admin/adminPanel/adminPanel';
import JobDetails from '../admin/jobDetails/jobDetails';
import Job from '../job/job';
import TrainingProgram from '../training/trainingPrograms/trainingPrograms';
import TrainingDetail from '../training/trainingDetail/trainingDetail';
// import Submenu01 from '../../../src/';
// import Submenu02 from '../../../submenu/Submenu02';
// import BlogGrid from '../../../blog/BlogGrid';
// import BlogSingle from '../../../blog/BlogSingle';
// import BlogRightSidebar from '../blog/BlogRightSidebar';
// import BlogLeftSidebar from '../blog/BlogLeftSidebar';
// import BlogFullWidth from '../blog/BlogFullWidth';
// import ComingSoon from '../comingSoon/ComingSoon';
// import NotFound from '../notFound/NotFound';

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/training" element={<TrainingProgram />} />
      <Route path="/training/:courseName" element={<TrainingDetail />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/portfolio-single" element={<PortfolioSingle />} />
      {/* <Route path="/submenu01" element={<Submenu01 />} /> */}
      {/* <Route path="/submenu02" element={<Submenu02 />} /> */}
      <Route path="/service" element={<Service />} />
      {/* <Route path="/blog-grid" element={<BlogGrid />} />
      <Route path="/blog-single" element={<BlogSingle />} />
      <Route path="/blog-right-sidebar" element={<BlogRightSidebar />} />
      <Route path="/blog-left-sidebar" element={<BlogLeftSidebar />} />
      <Route path="/blog-full-width" element={<BlogFullWidth />} /> */}
      <Route path="/about" element={<Home />} />
      {/* <Route path="/coming-soon" element={<ComingSoon />} /> */}
      {/* <Route path="/404" element={<NotFound />} /> */}
      <Route path="/faq" element={<Contact />} />
      <Route path="/pricing" element={<Contact />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin/contact-details" element={<ContactDetails />} />
      <Route path="/in/jobs" element={<Jobs country="India" />} />
      <Route path="/us/jobs" element={<Jobs country="USA" />} />
      <Route path="/job/:jobId" element={<Job />} />
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminPanel />
        </ProtectedRoute>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/job-posting" element={
        <ProtectedRoute>
          <JobPosting />
        </ProtectedRoute>
      } />
      <Route path="/admin/job-applicants" element={
        <ProtectedRoute>
          <JobApplicants />
        </ProtectedRoute>
      } />
      <Route path="/admin/job-details" element={
        <ProtectedRoute>
          <JobDetails />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Navigation;
