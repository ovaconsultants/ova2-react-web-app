import React from 'react';
import { useSetAtom} from 'jotai'
import { Link } from 'react-router-dom';
import {homeAtom}  from '../../jotia/globalAtoms/homeAtom';

const ActionHome = () => {
  const setHomeAtom = useSetAtom(homeAtom)
    setHomeAtom(true);
  return (
    <section className="call-to-action bg-1 section-sm overly">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="block">
              <h2 className="mb-3">We Create Amazing Digital Experiences.</h2>
              <p>
              Learn more about our work and design philosophy.
               See the successful projects we’ve completed for our clients, 
               and get to know our passionate and experienced design team.
               Discover how we can help your business thrive in the digital world. Let’s build something great together.
              </p>
              <Link className="btn btn-main btn-solid-border" to="/contact">Connect with US</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActionHome;
