import React from 'react';
import "../sliderHome/sliderHome.scss";

const SliderHome = () => {
    return (
        <section className="slider">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="block">
                            <h1 className="animated fadeInUp">IT Consulting, Digital Marketing, <br /> Training &amp; AI Design Agency</h1>
                            <p className="animated fadeInUp">
                            We're passionate about the web & mobile apps and take pride in our work.<br/> Our collaborative approach ensures we provide tailored solutions that meet our clients' needs.
                            </p>
                            <a href="/contact" className="btn btn-main animated fadeInUp">
                                Connect Now !
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SliderHome;
