import React from 'react';
import {companyName}  from "../../../constants/commonConstant";
import "../aboutHome/aboutHome.scss";
const AboutHome = () => {
    return (
        <section className="about section">
            <div className="container">
                <div className="row">
                    <div className="col-md-7">
                        <div className="block">
                            <div className="section-title">
                                <h2 className='text-left'>About Us</h2>
                                <p className='text-left'>
                                Welcome to {companyName}, where innovation meets expertise.
                                 Founded with a vision to bridge the gap between technology and business,
                                  we specialize in IT consulting, software development, and comprehensive training solutions.
                                </p>
                            </div>
                            <p className='text-left'>
                            Our mission is to empower businesses with cutting-edge technology solutions and knowledge,
                             enabling them to achieve their full potential. 
                            We believe in fostering growth and innovation through tailored strategies and expert guidance.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="block">
                            <img src="images/wrapper-img.png" alt="Img" />
                            {/* <img src="" alt="Img" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHome;
