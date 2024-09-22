import React from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';
import $ from 'jquery';

const TestimonialHome = () => {
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    items: 1,
  };

  return (
    <section className="testimonial">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title text-center">
              <h2>Fun Facts About Us</h2>
              <p>
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                <br />
                there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics
              </p>
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="block">
              <ul className="counter-box clearfix">
                <li>
                  <div className="counter-item">
                    <i className="ion-ios-chatboxes-outline"></i>
                    <h4 className="count" data-count="99">
                      99
                    </h4>
                    <span>Cups Of Coffee</span>
                  </div>
                </li>
                <li>
                  <div className="counter-item">
                    <i className="ion-ios-glasses-outline"></i>
                    <h4 className="count" data-count="45">
                      45
                    </h4>
                    <span>Article Written</span>
                  </div>
                </li>
                <li>
                  <div className="counter-item">
                    <i className="ion-ios-compose-outline"></i>
                    <h4 className="count" data-count="125">
                      125
                    </h4>
                    <span>Projects Completed</span>
                  </div>
                </li>
                <li>
                  <div className="counter-item">
                    <i className="ion-ios-timer-outline"></i>
                    <h4 className="count" data-count="200">
                      200
                    </h4>
                    <span>Combined Projects</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-5 offset-md-1">
            <div className="testimonial-carousel text-center">
              <OwlCarousel className="testimonial-slider owl-carousel" {...options}>
                <div>
                  <i className="ion-quote"></i>
                  <p>
                    "This Company created an e-commerce site with the tools to make our business a success, with innovative
                    ideas we feel that our site has unique elements that make us stand out from the crowd."
                  </p>
                  <div className="user">
                    <img src="images/item-img1.jpg" alt="People" />
                    <p>
                      <span>Rose Ray</span> CEO-Themefisher
                    </p>
                  </div>
                </div>
                <div>
                  <i className="ion-quote"></i>
                  <p>
                    "This Company created an e-commerce site with the tools to make our business a success, with innovative
                    ideas we feel that our site has unique elements that make us stand out from the crowd."
                  </p>
                  <div className="user">
                    <img src="images/item-img1.jpg" alt="People" />
                    <p>
                      <span>Rose Ray</span> CEO-Themefisher
                    </p>
                  </div>
                </div>
                <div>
                  <i className="ion-quote"></i>
                  <p>
                    "This Company created an e-commerce site with the tools to make our business a success, with innovative
                    ideas we feel that our site has unique elements that make us stand out from the crowd."
                  </p>
                  <div className="user">
                    <img src="images/item-img1.jpg" alt="People" />
                    <p>
                      <span>Rose Ray</span> CEO-Themefisher
                    </p>
                  </div>
                </div>
                <div>
                  <i className="ion-quote"></i>
                  <p>
                    "This Company created an e-commerce site with the tools to make our business a success, with innovative
                    ideas we feel that our site has unique elements that make us stand out from the crowd."
                  </p>
                  <div className="user">
                    <img src="images/item-img1.jpg" alt="People" />
                    <p>
                      <span>Rose Ray</span> CEO-Themefisher
                    </p>
                  </div>
                </div>
              </OwlCarousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialHome;
