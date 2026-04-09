import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Wrap <App /> with a div for smooth color transitions and dark mode support
root.render(
  <React.StrictMode>
    <div className="transition-colors duration-500 bg-white dark:bg-black">
      <App />
    </div>
  </React.StrictMode>
);
