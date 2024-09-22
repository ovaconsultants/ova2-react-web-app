import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import './plugins/bootstrap/bootstrap.min.css';
import './plugins/Ionicons/css/ionicons.min.css';
import './plugins/animate-css/animate.css';
import './plugins/magnific-popup/magnific-popup.css';
import './plugins/slick/slick.css';
import './scss/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Breadcrumb from './components/breadcrumb/breadcrumb';
import Navigation from './components/navigation/navigation';
import ScrollToTop from './components/home/scrollToTop/scrollToTop';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <div className="main-container">
      <AuthProvider>
        <Router>
          <Header />
          <Breadcrumb />
          <div className="content">
            <Navigation />
            <ScrollToTop />
          </div>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
