import React from 'react';
import {companyName}  from "../../../constants/commonConstant";

const ServiceHome = () => {
  return (
    <section className="service">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <div className="section-title">
              <h2>Our Services</h2>
              <p className='text-left'>
              At {companyName}, we offer a comprehensive suite of services designed to meet the diverse needs of our clients. Our expertise spans IT consulting, software development, and professional training programs, ensuring that we provide holistic solutions for your business challenges.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="service-item">
              <i className="icon ion-coffee"></i>
              <h4>Branding</h4>
              <p className=' text-justify'>Our branding services help your business stand out by creating a unique and compelling brand identity. We craft strategies that resonate with your target audience and drive brand loyalty. </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="service-item">
              <i className="ion-compass"></i>
              <h4>Web Design</h4>
              <p className ="text-justify">Our web design solutions are focused on creating visually stunning and user-friendly websites. We blend creativity with functionality to deliver an exceptional online experience for your users. </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="service-item">
              <i className="ion-image"></i>
              <h4>App Design</h4>
              <p className ="text-justify">Transform your ideas into engaging mobile experiences with our app design services. We focus on intuitive design and seamless user interfaces to enhance customer engagement. </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="service-item">
              <i className="ion-bug"></i>
              <h4>Start Up</h4>
              <p className ="text-justify">Empower your startup with tailored solutions that drive growth and innovation. We provide strategic support and expert guidance to help you navigate the competitive landscape. </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="service-item">
              <i className="ion-headphone"></i>
              <h4>Logo Design</h4>
              <p className ="text-justify">Make a lasting impression with a professionally designed logo that captures the essence of your brand. Our logos are designed to be memorable, versatile, and reflective of your brand’s identity. </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="service-item">
              <i className="ion-leaf"></i>
              <h4>Development</h4>
              <p className ="text-justify">From concept to deployment, our development services ensure robust and scalable solutions. We specialize in creating custom software that meets your business needs and drives operational efficiency. </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="service-item">
              <i className="ion-planet"></i>
              <h4>Brand Identity</h4>
              <p className ="text-justify">Build a strong and cohesive brand identity that differentiates your business in the market. We develop comprehensive brand strategies that encompass visual, verbal, and experiential elements.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="service-item">
              <i className="ion-earth"></i>
              <h4>IT Consulting</h4>
              <p className ="text-justify">Optimize your IT infrastructure with our expert consulting services. We provide strategic insights and innovative solutions to help you leverage technology for maximum business impact. </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHome;
