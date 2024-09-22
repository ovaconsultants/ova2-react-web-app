import React, { useState, useEffect } from 'react';
import './scrollToTop.scss'; // Make sure to create and import the CSS for styling

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div id="scroll-to-top" className={`scroll-to-top ${visible ? 'show' : ''}`} onClick={scrollToTop}>
            <span className="icon ion-ios-arrow-up"></span>
        </div>
    );
};

export default ScrollToTop;