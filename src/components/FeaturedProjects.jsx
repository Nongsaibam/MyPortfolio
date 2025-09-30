// import React from "react";

// const projects = [
//   {
//     title: "Face2Comic",
//     description:
//       "A Pix2Pix cGAN-based approach to cartoonify human portraits using TensorFlow and CNN.",
//     tags: ["Python", "TensorFlow", "cGAN"],
//     image: "/images/face2comic.jpg", // Ensure image path is correct
//   },
//   {
//     title: "Image Captioning",
//     description:
//       "Generative model to create captions for images using Flickr8k dataset with CNN and Transformer architecture.",
//     tags: ["Python", "CNN", "Transformers"],
//     image: "/images/imagecaptioning.jpg",
//   },
//   {
//     title: "Facial Recognition System",
//     description:
//       "Real-time facial recognition system using Haar Cascade and OpenCV for accurate identification.",
//     tags: ["Python", "OpenCV", "Haar Cascade"],
//     image: "/images/facialrecognition.jpg",
//   },
// ];

// export default function FeaturedProjects() {
//   return (
//     <section className="py-12 px-6 bg-gray-100 ">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl font-bold text-gray-800 mb-10">
//           <span className="text-gray-400">03</span>{" "}
//           <span className="border-b-4 border-blue-500 pb-1">Featured Projects</span>
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
//           {projects.map((project, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition hover:scale-105">
//               <img
//                 src={project.image}
//                 alt={project.title}
//                 className="h-48 w-full object-cover"
//               />
//               <div className="p-5">
//                 <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
//                 <p className="text-sm text-gray-600 mt-2">{project.description}</p>
//                 <div className="mt-4 flex flex-wrap gap-2">
//                   {project.tags.map((tag, i) => (
//                     <span
//                       key={i}
//                       className="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded hover:bg-blue-100 transition">
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
