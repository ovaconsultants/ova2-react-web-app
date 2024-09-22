import React from 'react';
import './service.scss'; // Ensure you have the SCSS file for styling
import { companyName } from "../../constants/commonConstant";

const Service = () => {
  return (
    <div>
      <section className="page-title bg-2">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block">
                <h1>Services</h1>
                <p className="text-justify">We offer a range of services to support your business needs.
                  Our comprehensive training programs are designed to upskill professionals in the latest technologies
                  and methodologies, ensuring practical and impactful learning experiences.
                  Through our placement services, we connect skilled professionals with leading companies,
                  facilitating successful and fulfilling careers.
                  Our recruitment team specializes in finding top talent that fits your company’s culture and specific requirements.
                  With our bench marketing services, we help IT consultants find suitable projects quickly by leveraging our extensive network and industry knowledge.
                  Additionally, we create custom web and mobile applications that are visually stunning and highly functional,
                  driving engagement and achieving your business objectives.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-about section">
        <div className="container">
          <div className="row align-items-center text-center text-lg-left">
            <div className="col-lg-6">
              <h2>Innovative UX/UI Design, Training, and Placement Agency</h2>
              <p className="mt-30">
                We are a leading agency specializing in creative UX/UI design, professional training, and job placement services.
                Our mission is to transform digital experiences through innovative design while empowering professionals
                with the skills they need to succeed in the tech industry.
              </p>
              <p className="mt-30">
                Our comprehensive training programs are designed to keep professionals at the forefront of the industry.
                We offer courses on the latest technologies and best practices, providing hands-on experience and real-world applications.
                Our goal is to equip individuals and teams with the knowledge and skills to excel in their careers.
              </p>
              <p className="mt-30">
                Our placement services connect talented professionals with top companies.
                We work closely with both job seekers and employers to ensure a perfect match.
                By understanding the unique needs of each party, we facilitate successful placements that lead to long-term career growth and business success.
              </p>
            </div>
            <div className="col-lg-6">
              <img className="img-fluid" src="images/company/company-group-pic.jpg" alt="Company Group" />
            </div>
          </div>
        </div>
      </section>

      <section className="service-arrow">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-sm-6 bg-primary">
              <div className="block">
                <i className="ion-erlenmeyer-flask text-white"></i>
                <h3 className="text-white mb-3">UX/UI Interface Design</h3>
                <p className='text-justify'>Our team excels in creating intuitive and visually captivating interfaces that enhance user experience.
                  By focusing on user needs and behaviors, we design interfaces that are not only beautiful but also highly functional. From initial wireframes to polished prototypes, every element is crafted to provide a seamless and engaging interaction.
                  Our goal is to ensure your digital products are easy to use and leave a lasting impression on your users.</p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 bg-primary bg-primary-dark">
              <div className="block">
                <i className="ion-leaf text-white"></i>
                <h3 className="text-white mb-3">Digital Marketing</h3>
                <p className="text-justify">Our digital marketing services are designed to help your business grow and succeed in the online landscape.
                  We create tailored marketing strategies that increase your brand's visibility, engage your target audience,
                  and drive conversions. Our services include search engine optimization (SEO), social media marketing,
                  content creation, email marketing, and pay-per-click (PPC) advertising.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12 bg-primary bg-primary-darker">
              <div className="block">
                <i className="ion-lightbulb text-white"></i>
                <h3 className="text-white mb-3">Web / App Development</h3>
                <p className="text-justify">Our web and app development services provide custom solutions tailored to your business needs.
                  We specialize in creating robust, scalable, and user-friendly web and mobile applications.
                  Our development process involves thorough planning, innovative design, and agile execution to
                  deliver high-quality products. From e-commerce platforms to enterprise applications,
                  we ensure your digital solutions are secure, efficient, and aligned with your business objectives.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-list section bg-gray">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title text-center">
                <h2>Our Expertise</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="block">
                <h3 className="mb-3">IT Software Training</h3>
                <p className="text-justify">Our expert trainers offer hands-on learning in web development, programming, cloud computing,
                  cybersecurity, data science, and more. With flexible delivery options and customized programs,
                  we ensure our training meets your specific needs.</p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="block">
                <h3 className="mb-3">Digital Marketing</h3>
                <p className="text-justify">Our digital marketing services are designed to help your business grow.
                  Our services include search engine optimization (SEO), social media marketing,
                  content creation, email marketing, and pay-per-click (PPC) advertising.</p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="block">
                <h3 className="mb-3">Recruitment and Placement</h3>
                <p className="text-justify">At {companyName}, we specialize in connecting talented IT professionals with top companies.
                  Our expert team ensures the right fit for both candidates and employers,
                  streamlining the hiring process and securing successful placements.</p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="block">
                <h3 className="mb-3">Web and Mobile Development</h3>
                <p className="text-justify">Master the skills needed to create dynamic websites & mobile apps with our comprehensive training.
                  Learn the latest technologies and best practices in frontend and backend development, as well as cross-platform mobile app development.</p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="block">
                <h3 className="mb-3">IT Consulting</h3>
                <p className="text-justify">At {companyName}, we provide expert IT consulting services to 
                  help businesses optimize their technology strategies, and drive innovation. 
                  Our experienced consultants deliver tailored solutions to meet your unique business needs.</p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="block">
                <h3 className="mb-3">UI/UX Design</h3>
                <p className="text-justify">Master the principles of user interface and user experience design with our expert-led training. 
                  Learn to create intuitive, user-friendly interfaces and enhance user satisfaction through
                   hands-on projects and real-world applications.</p>
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
                <h2 className="mb-3">We craft engaging and enjoyable digital experiences.</h2>
                <p className="text-left"> At {companyName}, we specialize in creating digital experiences that are not only 
                  functional but also enjoyable and engaging. Our team of expert designers 
                  focuses on crafting user-centric interfaces that enhance satisfaction and usability. 
                  We combine aesthetics with seamless functionality to deliver digital solutions that delight users 
                  and meet business goals. From websites to mobile apps, we ensure every interaction is intuitive,
                   beautiful, and impactful. Join us in transforming your digital presence into an experience your
                    users will love.
                </p>
                <a className="btn btn-main btn-solid-border" href="/contact">Connect Us</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;
