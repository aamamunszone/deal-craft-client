import React from 'react';
import Header from '../../components/shared/Header/Header';
import { Outlet } from 'react-router';
import Footer from '../../components/shared/Footer/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      {/* Header section */}
      <header>
        <Header />
      </header>

      {/* Main Section */}
      <main className="flex-1 py-3 md:py-5 lg:py-7">
        <Outlet />
      </main>

      {/* Footer Section */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
