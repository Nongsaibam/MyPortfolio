// Layout.jsx
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white dark:bg-black transition-colors duration-500">
      {children}
    </div>
  );
};

export default Layout;
