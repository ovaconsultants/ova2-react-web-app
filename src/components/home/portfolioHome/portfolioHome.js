import React from 'react';
import { Link } from 'react-router-dom';

const PortfolioHome = () => {
  return (
    <section className="feature bg-2">
      <div className="container text-left">
        <div className="row justify-content-end">
          <div className="col-md-6">
            <h2 className="section-subtitle">Why Choose Us?</h2>
            <div className='text-left'>
           <p>
            <b>Expert Team:</b> Our team consists of seasoned professionals with extensive experience in IT consulting, development, and training. We bring a wealth of knowledge and a passion for technology to every project.
            </p>
            <p>
            <b> Customer-Centric Approach:</b> We prioritize our clients' needs and work collaboratively to achieve their goals. Our solutions are designed to be flexible, scalable, and aligned with your business objectives.
            </p>
            <p>
            <b>Innovation-Driven:</b> We stay ahead of industry trends and continuously innovate to provide our clients with the most effective and efficient solutions. Our commitment to excellence ensures we deliver high-quality results every time.
            </p>
            </div>
            <Link to="/projects" className="btn btn-view-works">View Works</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioHome;
