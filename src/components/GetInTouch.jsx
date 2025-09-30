import { useParams, Link } from "react-router-dom";
import React from "react";

const GetInTouch = () => {
  return (
    <section className="bg-gray-100 py-20 px-4 text-center" id="contact">
      <h2 className="text-4xl font-bold text-gray-800">
        <span className="text-gray-700">04</span> Get In Touch
      </h2>

      <p className="mt-6 max-w-2xl mx-auto text-gray-600 text-lg">
        I’m currently looking for new opportunities and am open to collaborations,
        especially in AI and machine learning projects.
      </p>

      <div className="mt-8">
        <a
          href="mailto:nongsaibamtazkhan.gmail.com"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-semibold"
        >
          Say Hello
        </a>
      </div>

      <footer className="mt-20 text-sm text-gray-500">
        <p>Designed & Built by Nongsaibam Tazkhan © 2025</p>
        <p className="mt-1 italic text-xs">
          
        </p>
      </footer>
    </section>
  );
};

export default GetInTouch;
