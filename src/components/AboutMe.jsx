import React from "react";

const AboutMe = () => {
  return (
    <section id="about" className="bg-gray-100 min-h-screen px-6 py-12 md:px-20 md:py-20 text-gray-700">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-5xl font-extrabold text-gray-600">01</h1>
          <h2 className="text-3xl font-bold border-b-4 border-blue-600 pb-1">About Me</h2>
        </div>
        <article className="text-lg leading-relaxed space-y-6">
          <p>
           My name is NONGSAIBAM TAZKHAN, and I'm currently living in Bangalore.I have completed my Bachelor’s degree in Computer Applications 
           (BCA) from Manipur University.During my studies, I completed two internships one for 6 months and another for 2 months.
            </p>
          <p>
           {" "}
            <a href="#" className="text-blue-700 font-semibold hover:underline">
            {/* () */}
            </a>During my internship, I have created on the Manipur Tourism website, focusing on the front-end 
            using  HTML, and Tailwind CSS. I also developed a personal web application called the "To-Do List 
            App", where I handled the front-end using React.js, HTML, and CSS, and the back-end using JavaScript and Node.js,
            with MySQL and MongoDB as the databases.
          </p>
        </article>
      </div>
    </section>
  );
};

export default AboutMe;
