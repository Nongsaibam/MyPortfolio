import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

// ✅ Import all certificate images from src/assets/CertificateImage/
import udemyImage from "../assets/CertificateImage/Udemy.jpg";
import codexpImage from "../assets/CertificateImage/Codexp.jpg";
import wayspire1 from "../assets/CertificateImage/Wayspire1.png";
import wayspire2 from "../assets/CertificateImage/Wayspire2.png";
import workshopImage from "../assets/CertificateImage/Workshop.png";
import greatLearningImage from "../assets/CertificateImage/GreatLearning.png";
import genAIImage from "../assets/CertificateImage/GenerativeAIForBeginners.png";
import geminiImage from "../assets/CertificateImage/GeminiForGoogleWorkspace.png";
import introGenAIImage from "../assets/CertificateImage/IntroductionToGenerativeAI.png";
import promptEngImage from "../assets/CertificateImage/IntroductionToPromptEngineering.png";

// Certificate Data
const certificates = [
  { id: 1, title: "JavaScript", platform: "Udemy", category: "Course", image: udemyImage },
  { id: 2, title: "Full Stack Web Developer", platform: "CodeXp", category: "Internship", image: codexpImage },
  { id: 3, title: "Full Stack Web Developer", platform: "WaySpire", category: "Internship", image: wayspire1, extraImages: [wayspire2] },
  { id: 4, title: "IIIT Workshop", platform: "Others", category: "Workshop", image: workshopImage },
  { id: 5, title: "React.js", platform: "Great Learning", category: "Course", image: greatLearningImage },
  { id: 6, title: "Generative AI For Beginner", platform: "Great Learning", category: "Course", image: genAIImage },
  { id: 7, title: "Gemini For Google Workspace", platform: "Simplilearn|SkillUP", category: "Course", image: geminiImage },
  { id: 8, title: "Introduction to Generative AI", platform: "Simplilearn|SkillUP", category: "Course", image: introGenAIImage },
  { id: 9, title: "Introduction to Prompt Engineering with GitHub Copilot", platform: "Simplilearn|SkillUP", category: "Course", image: promptEngImage },
];

// Filters
const filters = ["All", "Course", "Internship", "Workshop"];

const CertificatesWithDetail = () => {
  const { id } = useParams();
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter certificates
  const filteredCertificates =
    activeFilter === "All"
      ? certificates
      : certificates.filter((cert) => cert.category === activeFilter);

  // ✅ Detail Page
  if (id) {
    const certificate = certificates.find((cert) => cert.id === Number(id));
    if (!certificate) {
      return (
        <div className="p-8 text-center text-lg">Certificate not found.</div>
      );
    }

    return (
      <section className="min-h-screen px-6 py-12 md:px-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Link
          to="/certificates"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Back
        </Link>

        <div className="max-w-3xl mx-auto bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          {/* Main image */}
          {certificate.image && (
            <img
              src={certificate.image}
              alt={certificate.title}
              className="w-full h-96 object-contain rounded mb-6"
            />
          )}

          {/* Extra images */}
          {certificate.extraImages &&
            certificate.extraImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${certificate.title} extra`}
                className="w-full h-80 object-contain rounded mb-6"
              />
            ))}

          <h2 className="text-3xl font-bold mb-2">{certificate.title}</h2>
          <p className="text-lg">Platform: {certificate.platform}</p>
          <p className="text-md">Category: {certificate.category}</p>

          {/* PDF Link */}
          {certificate.pdf && (
            <a
              href={certificate.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-blue-500 underline"
            >
              View Full PDF
            </a>
          )}
        </div>
      </section>
    );
  }

  // ✅ List Page
  return (
    <section
      id="certificates"
      className="bg-gray-100 dark:bg-gray-900 min-h-screen px-6 py-12 md:px-20 text-gray-800 dark:text-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-5xl font-extrabold text-gray-400">01</h1>
          <h2 className="text-3xl font-bold border-b-4 border-blue-600 pb-1">
            Certificates & Achievements
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1 rounded-full border transition font-medium ${
                activeFilter === filter
                  ? "bg-blue-600 text-white border-blue-600"
                  : "text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertificates.map((cert) => (
            <Link to={`/certificates/${cert.id}`} key={cert.id}>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transition relative">
                {cert.image ? (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-40 object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-40 flex items-center justify-center bg-gray-300 dark:bg-gray-700 rounded">
                    <span className="text-gray-600 dark:text-gray-300">
                      PDF Only
                    </span>
                  </div>
                )}

                <h4 className="mt-3 font-semibold text-lg text-gray-700 dark:text-white">
                  {cert.title}
                </h4>

                <span
                  className={`absolute top-2 right-2 text-sm px-3 py-1 rounded-full text-white ${
                    cert.category === "Course"
                      ? "bg-blue-500"
                      : cert.category === "Internship"
                      ? "bg-purple-600"
                      : "bg-gray-600"
                  }`}
                >
                  {cert.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesWithDetail;
