import React from 'react';
// import Header from './Header';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return (
    <div className={`flex flex-col h-screen overflow-auto ${isHomePage ? 'bg-afro-light' : 'bg-white'}`}>
      {/* <Header />*/}
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
     <Footer />
    </div>
  );
};

export default Layout;


