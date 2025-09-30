import React from "react";

const skills = [
  {
    category: "Python Full Stack + AI Developer",
    items: [
      "Python",
      "Html","Css",
      "Rreact.js","Django",
      "NumPy","Pandas",
      "Matplotlip","Learn",
      "PyTprch", "Node.js",
      "AWS EC2","Javascript",
    ],
  },
  {
    category: "Full Stack Web Developer In MERN",
    items: [
      "JavaScript ES6",
      "React.js","Node.js",
      "Redux", "Express.js",
      "Tailwind Css","Bootstrap",
      "HTML","Css","Mongo DB"
    ],
  },
  {
    category: "Backend & Databases",
    items: ["RestAPI", "FastAPI", "MongoDB", "MYSQL"],
  },
  {
    category: "Tools & Version Control ",
    items: ["Git", "GitHub",],
  },
];

const SkillsSection = () => {
  return (
    <section className="bg-gray-100 py-20 px-4" id="skills">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-12">
          <h2 className="text-5xl font-bold text-gray-400">03</h2>
          <h3 className="text-3xl font-semibold border-b-4 border-blue-600 pb-1 ">
            Skills & Tools
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-10 text-left hover:shadow-lg transition "
>
              <h4 className="text-lg font-semibold text-blue-600 mb-4 ">
                {skill.category}
              </h4>
              <ul className="space-y-2 text-gray-700 ">
                {skill.items.map((item, idx) => (
              <li
              key={idx}
              className="inline-block px-2 py-0.5 rounded-full hover:bg-blue-600 hover:text-white transition duration-200">
               {item}
            </li>
            
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
