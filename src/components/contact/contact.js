import React from 'react';
import './contact.scss'; // Ensure you have the SCSS file for styling

const Contact = () => {
  return (
    <div>
      <section className="page-title bg-2">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block">
                <h1>Drop Us An Email</h1>
                <p>Have a question, feedback, or just want to say hello? We’d love to hear from you! </p>
                <p>Feel free to contact us, and we’ll get back to you as soon as possible.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-form">
        <div className="container">
          <form className="row" id="contact-form">
            <div className="col-md-6 col-sm-12">
              <div className="block">
                <div className="form-group">
                  <input name="user_name" type="text" className="form-control" placeholder="Your Name" />
                </div>
                <div className="form-group">
                  <input name="user_email" type="text" className="form-control" placeholder="Email Address" />
                </div>
                <div className="form-group">
                  <input name="user_subject" type="text" className="form-control" placeholder="Subject" />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="block">
              <div className="form-group">
                  <input name="user_phone" type="number" className="form-control" placeholder="Mobile / Phone" />
                </div>
                <div className="form-group-2">
                  <textarea name="user_message" className="form-control" rows="4" placeholder="Your Message"></textarea>
                </div>             
              </div>
            </div>
            <div className="col-md-12 col-sm-12">
              <div className="block">
              <div className="form-group">
               
                <button className="btn btn-default" type="button">Send Message</button>
              </div>
            </div>
            </div>
            <div className="error" id="error">Sorry Msg does not sent</div>
            <div className="success" id="success">Message Sent</div>
          </form>
          <div className="contact-box row text-left">
            <div className="col-md-12 col-sm-12">
              <div className="block">
                <h2>Come visit us sometime!</h2>
                <div className='row'>
                <div className="col-md-6 col-sm-12">
                    <h4>USA Office</h4>
                <ul className="address-block">
                  <li>
                    <i className="ion-ios-location-outline"></i> 15 S Harrison Ave Iselin, NJ.
                  </li>
                  <li>
                    <i className="ion-ios-email-outline"></i> Email: hr@ova2consultancy.com
                  </li>
                  <li>
                    <i className="ion-ios-telephone-outline"></i> Phone: +1-848-467-9558
                  </li>
                </ul>
                </div>
                <div className="col-md-6 col-sm-12">
                    <h4>India Office</h4>
                <ul className="address-block">
                  <li>
                    <i className="ion-ios-location-outline"></i> Greater Noida, Uttar Pradesh, India
                  </li>
                  <li>
                    <i className="ion-ios-email-outline"></i> Email: hr@ova2consultancy.com
                  </li>
                  <li>
                    <i className="ion-ios-telephone-outline"></i> Phone: +91-9350520148
                  </li>
                </ul>
                </div>
                </div>
                <ul className="social-icons">
                  <li>
                    <a href="/"><i className="ion-social-googleplus-outline"></i></a>
                  </li>
                  <li>
                    <a href="/"><i className="ion-social-linkedin-outline"></i></a>
                  </li>
                  <li>
                    <a href="/"><i className="ion-social-pinterest-outline"></i></a>
                  </li>
                  <li>
                    <a href="/"><i className="ion-social-dribbble-outline"></i></a>
                  </li>
                  <li>
                    <a href="/"><i className="ion-social-twitter-outline"></i></a>
                  </li>
                  <li>
                    <a href="/"><i className="ion-social-facebook-outline"></i></a>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="col-md-6 mt-5 mt-md-0">
              <div className="block">
                <div className="google-map">
                  <div className="map" id="map_canvas" data-latitude="51.5223477" data-longitude="-0.1622023"
                    data-marker="images/marker.png"></div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
