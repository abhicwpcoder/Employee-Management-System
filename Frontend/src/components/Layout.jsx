import React, { useState } from 'react';
import Header from './common/Header';
import Sidebar from './common/Sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="main-content" onClick={() => sidebarOpen && setSidebarOpen(false)}>
        {children}
      </main>
    </div>
  );
};

export default Layout;