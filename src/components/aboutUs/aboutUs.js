import React from 'react';
import './aboutUs.scss';

const AboutUs = () => {
  return (
    <div>
      <section className="page-title bg-2">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block">
                <h1>About Our Company</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, ex!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-img">
                <img className="img-fluid" src="images/company/about.jpg" alt="About our company" />
              </div>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="pl-0 pl-lg-4">
                <h2>We strive to be the best and <br /> make awesome work.</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius enim, accusantium repellat ex autem numquam iure officiis facere vitae itaque.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam qui vel cupiditate exercitationem, ea fuga est velit nulla culpa modi quis iste tempora non, suscipit repellendus labore voluptatem dicta amet? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, neque!</p>
                <a href="/contact" className="btn btn-small">Download Company Profile</a>
              </div>
            </div>
          </div>
          <div className="row counter-box text-center mt-50">
            {[
              { icon: 'ion-ios-flask-outline', count: 349, label: 'Completed Projects' },
              { icon: 'ion-ios-flame-outline', count: 35000, label: 'Lines Of Code' },
              { icon: 'ion-ios-pint-outline', count: 70, label: 'Satisfied Customer' },
              { icon: 'ion-ios-wineglass-outline', count: 10, label: 'Awards Winner' },
              { icon: 'ion-ios-chatboxes-outline', count: 30, label: 'Satisfied Customer' },
              { icon: 'ion-ios-body-outline', count: 15, label: 'Awards Winner' },
            ].map((item, index) => (
              <div className="col-lg-2 col-md-4 col-6 mt-4" key={index}>
                <div className="counter-item">
                  <i className={item.icon}></i>
                  <h4 className="count" data-count={item.count}>0</h4>
                  <span>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-feature bg-dark section dark-service">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="title">
                <h2>We are independent Design & Development Agency</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {[
              { icon: 'ion-ios-color-filter-outline', title: 'IOS App Development', desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incidid' },
              { icon: 'ion-ios-unlocked-outline', title: 'App Security', desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incidid' },
              { icon: 'ion-ios-game-controller-b-outline', title: 'Games Development', desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incidid' },
              { icon: 'ion-ios-mic-outline', title: 'Animation and Editing', desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incidid' },
              { icon: 'ion-ios-lightbulb-outline', title: 'UI/UX Design', desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incidid' },
              { icon: 'ion-ios-body-outline', title: 'Branding', desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incidid' },
            ].map((item, index) => (
              <div className="col-lg-4 col-sm-6" key={index}>
                <div className="service-item">
                  <i className={item.icon}></i>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonial section-sm">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="testimonial-carousel text-center">
                <div className="testimonial-slider owl-carousel">
                  {[...Array(4)].map((_, index) => (
                    <div key={index}>
                      <i className="ion-quote"></i>
                      <p>"This Company created an e-commerce site with the tools to make our business a success, with innovative ideas we feel that our site has unique elements that make us stand out from the crowd."</p>
                      <div className="user">
                        <img src="images/item-img1.jpg" alt="People" />
                        <p><span>Rose Ray</span> CEO-Themefisher</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="tabCommon">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <a className="nav-link active" id="vision-tab" data-toggle="tab" href="#vision" role="tab" aria-controls="vision" aria-selected="true">Vision</a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a className="nav-link" id="mission-tab" data-toggle="tab" href="#mission" role="tab" aria-controls="mission" aria-selected="false">Mission</a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a className="nav-link" id="approch-tab" data-toggle="tab" href="#approch" role="tab" aria-controls="approch" aria-selected="false">Approach</a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" id="vision" role="tabpanel" aria-labelledby="vision-tab">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore nobis ducimus facere repellat harum, eius cupiditate, aliquam aut deserunt. Nemo illo ex impedit autem quod nobis architecto, velit quasi, aut voluptas porro natus. Fuga magnam perspiciatis fugit, placeat possimus officia non ducimus voluptatum aspernatur ad quidem neque accusantium repudiandae cupiditate nobis corporis, cum facere iusto, modi cumque consectetur saepe. Officia, molestiae tempore! Consequatur ipsa consequuntur saepe suscipit vero laudantium, mollitia, quaerat soluta nihil non tempore, quos dignissimos quasi ab officiis illum numquam quibusdam ducimus, veritatis ad. Quia, aliquid. Quaerat quos ducimus ipsam amet minus temporibus eos sequi alias hic nemo.</p>
                  </div>
                  <div className="tab-pane fade" id="mission" role="tabpanel" aria-labelledby="mission-tab">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore nobis ducimus facere repellat harum, eius cupiditate, aliquam aut deserunt. Nemo illo ex impedit autem quod nobis architecto, velit quasi, aut voluptas porro natus. Fuga magnam perspiciatis fugit, placeat possimus officia non ducimus voluptatum aspernatur ad quidem neque accusantium repudiandae cupiditate nobis corporis, cum facere iusto, modi cumque consectetur saepe. Officia, molestiae tempore! Consequatur ipsa consequuntur saepe suscipit vero laudantium, mollitia, quaerat soluta nihil non tempore, quos dignissimos quasi ab officiis illum numquam quibusdam ducimus, veritatis ad. Quia, aliquid. Quaerat quos ducimus ipsam amet minus temporibus eos sequi alias hic nemo.</p>
                  </div>
                  <div className="tab-pane fade" id="approch" role="tabpanel" aria-labelledby="approch-tab">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore nobis ducimus facere repellat harum, eius cupiditate, aliquam aut deserunt. Nemo illo ex impedit autem quod nobis architecto, velit quasi, aut voluptas porro natus. Fuga magnam perspiciatis fugit, placeat possimus officia non ducimus voluptatum aspernatur ad quidem neque accusantium repudiandae cupiditate nobis corporis, cum facere iusto, modi cumque consectetur saepe. Officia, molestiae tempore! Consequatur ipsa consequuntur saepe suscipit vero laudantium, mollitia, quaerat soluta nihil non tempore, quos dignissimos quasi ab officiis illum numquam quibusdam ducimus, veritatis ad. Quia, aliquid. Quaerat quos ducimus ipsam amet minus temporibus eos sequi alias hic nemo.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="call-to-action bg-1 section-sm overly">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block">
                <h2 className="mb-3">We design delightful digital experiences.</h2>
                <p>Read more about what we do and our philosophy of design. Judge for yourself The work and results <br /> we’ve achieved for other clients, and meet our highly experienced Team who just love to design.</p>
                <a className="btn btn-main btn-solid-border" href="/contact">Tell Us Your Story</a>
              </div>
            </div>
          </div>
        </div>
      </section>   
    </div>
  );
};

export default AboutUs;
