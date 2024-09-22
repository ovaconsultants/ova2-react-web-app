import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PortfolioSingle = () => {
  return (
    <section className="portfolio-single-page section-sm">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-8 col-lg-7">
            <PortfolioSingleSlider />
          </div>
          <div className="col-xl-4 col-lg-5 mt-5 mt-lg-0">
            <ProjectDetails />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ProjectContent />
          </div>
        </div>
      </div>
      <RelatedProjects />
    </section>
  );
};

const PortfolioSingleSlider = () => {
    const settings = {
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000
      };
    return (
        <Slider {...settings} className="portfolio-single-slider">
          {['portfolio-big-1.jpg', 'portfolio-big-2.jpg', 'portfolio-big-3.jpg', 'portfolio-big-4.jpg', 'portfolio-big-5.jpg', 'portfolio-big-6.jpg'].map((image, index) => (
            <div key={index}>
              <img className="img-fluid" src={`images/portfolio/${image}`} alt={`Portfolio ${index + 1}`} />
            </div>
          ))}
        </Slider>
      );
};

const ProjectDetails = () => {
  return (
    <div className="project-details text-left">
      <h4>Project Details</h4>
      <ul>
        <li><span><i className="fa fa-shirtsinbulk"></i> Client</span><strong>Jannie Kelonsky</strong></li>
        <li><span><i className="fa fa-shield"></i> What We Did</span><strong>Website Redesign</strong></li>
        <li><span><i className="fa fa-ils"></i> Tools Used</span><strong>Photoshop, Illustrator</strong></li>
        <li><span><i className="icon-calendar3"></i>Completed on:</span> 17th March 2020</li>
        <li><span><i className="icon-lightbulb"></i>Skills:</span> HTML5 / PHP / CSS3</li>
        <li><span><i className="icon-link"></i>Client:</span> <a href="index.html">Google</a></li>
      </ul>
    </div>
  );
};

const ProjectContent = () => {
  return (
    <div className="project-content mt-50 text-left">
       <h2 class="mb-3">Behance Website Redesign</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas officiis cumque, harum dicta necessitatibus
            reprehenderit, delectus molestiae, impedit alias adipisci distinctio voluptas. Tempora modi amet voluptate
            at provident soluta consequatur.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores quibusdam sed, neque recusandae, est
            odit. A facere tempore soluta laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, rem eaque facilis. Sit, voluptas?
            Error soluta odio, harum tenetur, alias in iure ipsam blanditiis illo, ratione, magnam a minima incidunt!
            Suscipit facilis, ut maxime libero necessitatibus, rerum aut voluptates aliquam maiores iusto qui
            temporibus nesciunt, incidunt in quasi. Veniam aliquid ea aperiam, obcaecati voluptate ab, temporibus
            fugiat at, inventore molestiae quibusdam, modi numquam debitis libero aut eum. Architecto sit quia quidem
            odit, quasi eveniet reprehenderit rerum dolorem voluptate sed aspernatur numquam enim, adipisci iste optio
            ea libero laboriosam praesentium aperiam nobis vero tempore consequuntur sapiente eos at. Suscipit quis
            voluptatibus temporibus dolore consectetur ex excepturi adipisci sunt. Maxime aperiam eos illum minima
            aliquid voluptate autem qui at impedit recusandae earum possimus, alias, maiores sint, sed quia quis aut
            cupiditate voluptatem reiciendis. Facilis nobis assumenda totam officiis dicta autem dolorem quidem
            similique, delectus rerum laborum veritatis, cum magnam dignissimos necessitatibus possimus error, eius
            omnis veniam culpa, porro officia adipisci exercitationem minus hic. Ipsum veritatis repudiandae nulla quo
            dicta voluptates tenetur mollitia perferendis sequi, magnam doloremque odit similique, sit, voluptas unde
            iste molestias. Accusantium, corporis quibusdam quod in animi earum alias autem ipsum. Eaque rem numquam
            delectus veniam commodi doloribus consequatur deleniti?
            </p>
      <div className="my-4">
        <div className="embed-responsive embed-responsive-16by9">
          <iframe id="iframe" title='iframe' className="embed-responsive-item" src="https://www.youtube.com/embed/LKFuXETZUsI?rel=0" allowFullScreen></iframe>
        </div>
      </div>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
    </div>
  );
};

const RelatedProjects = () => {
  const projects = [
    {
      imgSrc: 'images/portfolio/portfolio-big-2.jpg',
      title: 'Dribbble Redesign',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit...',
      link: 'portfolio-single.html',
    },
    {
      imgSrc: 'images/portfolio/portfolio-big-3.jpg',
      title: 'Dribbble Redesign',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit...',
      link: 'portfolio-single.html',
    },
  ];

  return (
    <section className="related-projects section-sm bg-gray">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h2>Related Other Projects</h2>
            </div>
          </div>
        </div>
        <div className="row text-left">
          {projects.map((project, index) => (
            <div className="col-md-6 mt-5" key={index}>
              <div className="content">
                <img className="img-fluid" src={project.imgSrc} alt={project.title} />
                <div className="content mt-4">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <a href={project.link} className="btn btn-small">View Case Study</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSingle;
