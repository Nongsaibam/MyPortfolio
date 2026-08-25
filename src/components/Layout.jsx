const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent text-slate-900 transition-colors duration-500 dark:text-slate-100">
      {children}
    </div>
  );
};

export default Layout;
