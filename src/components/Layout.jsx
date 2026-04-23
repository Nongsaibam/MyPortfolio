const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-slate-100">
      {children}
    </div>
  );
};

export default Layout;
