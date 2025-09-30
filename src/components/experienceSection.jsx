import React from "react";

const experiences = [
  {title: "Full Stack Web Developer ,Intern",
    date: "Jan 2025 - Jun 2025",
    location: "Manipur CodeXP",
    points: [
      "TOURISM WEBSITE – JUNE 2025 TO JULY 2025.",
      // "Tutored and mentored college students in machine learning, covering model training and data preprocessing.",
      // "Provided in-person and remote guidance for academic and industry-based projects.",
    ],
  },
  {
    title: "Full Stack Web Developer Intern",
    date: "April 2024 - Jun 2024",
    location: "Wayspire Ed-Tech Private Limited",
    points: [
        "To Do APP"
      // "Developed and deployed computer vision models for EV bus applications on NVIDIA Jetson Nano.",
      // "Collaborated with a technical team to successfully launch two applications on the Google Play Store.",
    ],
  },
 
];

export default function Experience() {
  return (
    <section className="bg-gray-100 py-20 px-6 md:px-16" id="experience">
     <div className="max-w-5xl mx-auto">
  {/* Title */}
  <div className="flex items-center gap-4 mb-12">
    <h2 className="text-5xl font-bold text-gray-400">02</h2>
    <h3 className="text-2xl sm:text-3xl font-semibold border-b-4 border-blue-600 pb-1">
      Experience
    </h3>
  </div>

  {/* Timeline */}
  <div className="relative border-l-2 border-gray-200 ml-30 pl-6 space-y-10">
  {experiences.map((exp, index) => (
    <div key={index} className="relative">
      {/* Dot */}
      <div className="absolute -left-10.5 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>

      {/* Date and Title in same line */}
      <div className="flex items-baseline flex-wrap gap-2 sm:gap-4">
        <p className="text-lg sm:text-xl  text-blue-600 font-semibold min-w-[140px]">
          {exp.date}
        </p>
        <h4 className="text-lg sm:text-xl  font-bold">{exp.title}</h4>
      </div>

      {/* Role & Location */}
      <p className="mt-1 text-lg  text-gray-600  max-w-4xl ml-52">
        {exp.role} at {exp.location}
      </p>

      {/* Bullet Points */}
      <ul className="mt-2 list-disc list-inside text-lg sm:text-xl text-gray-700 space-y-1 max-w-4xl ml-50">
  {exp.points.map((point, i) => (
    <li key={i}>{point}</li>
  ))}
</ul>
    </div>
  ))}
</div>

</div>

    </section>
  );
}
