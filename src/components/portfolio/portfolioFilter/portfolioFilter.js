import React from 'react';
import './portfolioFilter.scss'; // Ensure you have the SCSS file for styling

const PortfolioFilter = () => {
  return (
    <div>
      <section className="page-title bg-2">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block">
                <h1>Our Recent Projects.</h1>
                <p>Explore our recent projects to see the results we've achieved.
                   Our portfolio showcases the high-quality work we've done for our clients.
                  Each project highlights our commitment to excellence and innovation. 
                  See firsthand how we can bring value to your business.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-work">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block">
                <div className="portfolio-menu">
                  <div className="btn-group btn-group-toggle justify-content-center" data-toggle="buttons">
                    <label className="btn btn-sm btn-primary active">
                      <input type="radio" name="shuffle-filter" value="all" checked="checked" /> All
                    </label>
                    <label className="btn btn-sm btn-primary">
                      <input type="radio" name="shuffle-filter" value="design" /> UI/UX Design
                    </label>
                    <label className="btn btn-sm btn-primary">
                      <input type="radio" name="shuffle-filter" value="video" /> Video
                    </label>
                    <label className="btn btn-sm btn-primary">
                      <input type="radio" name="shuffle-filter" value="illustration" /> ILLUSTRATION
                    </label>
                  </div>
                </div>
                <div className="row shuffle-wrapper">
                  <div className="col-lg-4 col-sm-6 portfolio-item shuffle-item" data-groups='["design"]'>
                    <img src="images/portfolio/work1.jpg" alt="" />
                    <div className="portfolio-hover">
                      {/* <div className="portfolio-content">
                        <a href="images/portfolio/work1.jpg" className="portfolio-popup"><i className="icon ion-search"></i></a>
                        <a className="h3" href="portfolio-single.html">Rio Furniture</a>
                        <p>Labore et dolore magna aliqua. Ut enim ad </p>
                      </div> */}
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 portfolio-item shuffle-item" data-groups='["design","illustration"]'>
                    <img src="images/portfolio/work2.jpg" alt="" />
                    <div className="portfolio-hover">
                      {/* <div className="portfolio-content">
                        <a href="images/portfolio/work2.jpg" className="portfolio-popup"><i className="icon ion-search"></i></a>
                        <a className="h3" href="portfolio-single.html">Rio Furniture</a>
                        <p>Labore et dolore magna aliqua. Ut enim ad </p>
                      </div> */}
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 portfolio-item shuffle-item" data-groups='["illustration"]'>
                    <img src="images/portfolio/work3.jpg" alt="" />
                    <div className="portfolio-hover">
                      {/* <div className="portfolio-content">
                        <a href="images/portfolio/work3.jpg" className="portfolio-popup"><i className="icon ion-search"></i></a>
                        <a className="h3" href="portfolio-single.html">Rio Furniture</a>
                        <p>Labore et dolore magna aliqua. Ut enim ad </p>
                      </div> */}
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 portfolio-item shuffle-item" data-groups='["video","illustration"]'>
                    <img src="images/portfolio/work4.jpg" alt="" />
                    <div className="portfolio-hover">
                      {/* <div className="portfolio-content">
                        <a href="images/portfolio/work4.jpg" className="portfolio-popup"><i className="icon ion-search"></i></a>
                        <a className="h3" href="portfolio-single.html">Rio Furniture</a>
                        <p>Labore et dolore magna aliqua. Ut enim ad </p>
                      </div> */}
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 portfolio-item shuffle-item" data-groups='["design","illustration"]'>
                    <img src="images/portfolio/work5.jpg" alt="" />
                    <div className="portfolio-hover">
                      {/* <div className="portfolio-content">
                        <a href="images/portfolio/work5.jpg" className="portfolio-popup"><i className="icon ion-search"></i></a>
                        <a className="h3" href="portfolio-single.html">Rio Furniture</a>
                        <p>Labore et dolore magna aliqua. Ut enim ad </p>
                      </div> */}
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 portfolio-item shuffle-item" data-groups='["design","video"]'>
                    <img src="images/portfolio/work6.jpg" alt="" />
                    <div className="portfolio-hover">
                      {/* <div className="portfolio-content">
                        <a href="images/portfolio/work6.jpg" className="portfolio-popup"><i className="icon ion-search"></i></a>
                        <a className="h3" href="portfolio-single.html">Rio Furniture</a>
                        <p>Labore et dolore magna aliqua. Ut enim ad </p>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioFilter;
