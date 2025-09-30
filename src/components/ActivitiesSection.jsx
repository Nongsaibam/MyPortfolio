// import React from "react";
// import {
//   FaCodeBranch,
//   FaMicrophone,
//   FaRegCalendarAlt,
//   FaTrophy,
//   FaExternalLinkAlt,
// } from "react-icons/fa";

// const activities = [
//   {
//     title: "SWOC 2025 Project Maintainer",
//     description:
//       "Serving as a Project maintainer for Social Winter of Code 2025",
//     date: "January 1, 2025 - March 1, 2025",
//     tags: ["Project", "SWOC 2025"],
//     icon: <FaCodeBranch />,
//   },
//   {
//     title: "IWOC 3.0 Project Maintainer",
//     description:
//       "Serving as a Project maintainer for Innogeeks Winter of Code 2025",
//     date: "January 22, 2025 - Feb 27, 2025",
//     tags: ["Project", "IWOC 3.0"],
//     icon: <FaCodeBranch />,
//   },
//   {
//     title: "Speaker",
//     description:
//       "Delivering a speech on Open Source Contribution, Importance and Opportunities at Cyberlla 2025 held at Nielit, Imphal",
//     date: "March 1, 2025",
//     tags: ["Cyberlla 2025"],
//     icon: <FaMicrophone />,
//   },
//   {
//     title: "Hacktoberfest Participant",
//     description:
//       "Successfully participated in and completed the 2023 Hacktoberfest challenge",
//     date: "October 2023",
//     tags: ["View Contributions"],
//     icon: <FaRegCalendarAlt />,
//   },
//   {
//     title: "Dennis Ivy Hackathon",
//     description:
//       "Participated in the Dennis Ivy Hackathon, developing innovative solutions under time constraints",
//     date: "2022",
//     tags: ["Project"],
//     icon: <FaTrophy />,
//     button: {
//       label: "Watch Review",
//       link: "#",
//     },
//   },
//   {
//     title: "PowerToFly Student Hackathon",
//     description:
//       "Participated in a 24-hour online hackathon organized by PowerToFly, developing solutions within a challenging time constraint",
//     date: "April 23, 2022 - April 24, 2022",
//     tags: ["Project", "Devpost"],
//     icon: <FaTrophy />,
//   },
// ];

// const ActivitiesSection = () => {
//   return (
//     <section className="bg-gray-100 py-20 px-4" id="activities">
//       <div className="max-w-6xl mx-auto text-center">
//         <div className="flex items-center justify-center gap-4 mb-12">
//           <h2 className="text-5xl font-bold text-gray-400">05</h2>
//           <h3 className="text-3xl font-semibold border-b-4 border-blue-600 pb-1 text-left">
//             Activities & Engagements
//           </h3>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {activities.map((activity, index) => (
//             <div
//               key={index}
//               className="bg-white shadow-md rounded-xl p-10 text-left hover:shadow-lg transition"
//             >
//               <div className="flex items-center text-blue-600 text-xl mb-4">
//                 {activity.icon}
//                 <h4 className="ml-2 font-semibold text-base">
//                   {activity.title}
//                 </h4>
//               </div>

//               <p className="text-gray-700 mb-2">{activity.description}</p>
//               <p className="text-sm text-blue-500 mb-2">{activity.date}</p>

//               <div className="flex flex-wrap gap-2 text-sm text-gray-600">
//                 {activity.tags.map((tag, i) => (
//                   <span key={i} className="flex items-center gap-1">
//                     <FaExternalLinkAlt className="text-xs" /> {tag}
//                   </span>
//                 ))}
//               </div>

//               {activity.button && (
//                 <a
//                   href={activity.button.link}
//                   className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
//                 >
//                   {activity.button.label}
//                 </a>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ActivitiesSection;
