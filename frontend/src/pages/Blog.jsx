import React, { useState } from "react";
import ModuleCard from "../pages/ModuleCard";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const blogs = [
    {
      title: "Punjab Flood Relief: How AlertShiksha Stepped In",
      type: "pdf",
      url: "#",
      description:
        "An overview of how AlertShiksha mobilized volunteers and resources during the recent Punjab floods.",
      img: "https://source.unsplash.com/400x300/?flood,relief",
      category: "Relief",
    },
    {
      title: "Disaster Management Awareness for Communities",
      type: "pdf",
      url: "#",
      description:
        "Educating people on disaster preparedness and safety measures during natural calamities.",
      img: "https://source.unsplash.com/400x300/?community,awareness",
      category: "Awareness",
    },
    {
      title: "Student Volunteers in Flood Relief",
      type: "pdf",
      url: "#",
      description:
        "How students and youth contributed actively in rescue and relief operations in Punjab.",
      img: "https://source.unsplash.com/400x300/?students,volunteers",
      category: "Community",
    },
    {
      title: "Health & Hygiene in Flood-Affected Areas",
      type: "pdf",
      url: "#",
      description:
        "Steps taken to ensure clean drinking water, sanitation, and medical support during floods.",
      img: "https://source.unsplash.com/400x300/?health,water",
      category: "Health",
    },
    {
      title: "Technology in Disaster Response",
      type: "pdf",
      url: "#",
      description:
        "Use of digital tools, mobile apps, and AlertShiksha’s platform for better disaster coordination.",
      img: "https://source.unsplash.com/400x300/?technology,disaster",
      category: "Tech",
    },
    {
      title: "Rebuilding Lives After Punjab Floods",
      type: "pdf",
      url: "#",
      description:
        "Stories of resilience and how communities are recovering with the support of NGOs.",
      img: "https://source.unsplash.com/400x300/?rebuilding,community",
      category: "Recovery",
    },
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || blog.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-[#20538c] mb-8">
        The Blog
      </h1>

      {/* Search + Category */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-x-4 mb-10">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20538c]"
        />

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-1/6 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20538c]"
        >
          <option value="All">All</option>
          <option value="Relief">Relief</option>
          <option value="Awareness">Awareness</option>
          <option value="Community">Community</option>
          <option value="Health">Health</option>
          <option value="Tech">Tech</option>
          <option value="Recovery">Recovery</option>
        </select>
      </div>

      {/* Blog Cards Container */}
      <div className="bg-[#f1f5f9] p-8 rounded-xl shadow-md mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog, index) => (
            <ModuleCard key={index} {...blog} />
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-[#f1f5f9] p-8 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-4 text-[#20538c]">
          Join our Newsletter
        </h2>
        <p className="text-gray-600 mb-6">
          Subscribe to get the latest blogs directly in your inbox.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20538c]"
          />
          <button className="bg-[#20538c] text-white px-6 py-2 rounded-lg hover:bg-[#1b436b] transition-colors duration-300">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
