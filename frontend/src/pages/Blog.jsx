import React, { useState } from "react";
import ModuleCard from "../pages/ModuleCard";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [blogs, setBlogs] = useState([
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
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: "", description: "" });
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogToAdd = {
      title: newBlog.title,
      type: "pdf",
      url: "#",
      description: newBlog.description,
      img: "https://source.unsplash.com/400x300/?blog,write",
      category: "Community",
    };
    setBlogs([blogToAdd, ...blogs]);
    setNewBlog({ title: "", description: "" });
    setShowForm(false);
  };

  const confirmDelete = (index) => {
    setDeleteIndex(index);
    setShowConfirm(true);
  };

  const handleDelete = () => {
    const updatedBlogs = blogs.filter((_, i) => i !== deleteIndex);
    setBlogs(updatedBlogs);
    setShowConfirm(false);
    setDeleteIndex(null);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || blog.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-[#20538c] mb-8">
        The Blog
      </h1>

      {/* Search + Create + Category */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-x-4 mb-10">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20538c]"
        />
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#20538c] text-white px-5 py-2 rounded-lg hover:bg-[#1b436b] transition-colors duration-300 w-full md:w-auto"
        >
          {showForm ? "Cancel" : "Create Your Own"}
        </button>
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

      {/* Create Blog Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-[#f9fafb] border p-4 rounded-lg shadow-md mb-8 max-w-lg mx-auto"
        >
          <h3 className="text-lg font-semibold text-[#20538c] mb-2">
            Create Your Blog
          </h3>
          <input
            type="text"
            placeholder="Blog Title"
            value={newBlog.title}
            onChange={(e) =>
              setNewBlog({ ...newBlog, title: e.target.value })
            }
            className="w-full mb-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20538c]"
            required
          />
          <textarea
            placeholder="Blog Description"
            value={newBlog.description}
            onChange={(e) =>
              setNewBlog({ ...newBlog, description: e.target.value })
            }
            className="w-full mb-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20538c]"
            rows="3"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-[#20538c] text-white px-4 py-2 rounded-lg hover:bg-[#1b436b] transition-colors duration-300"
          >
            Submit
          </button>
        </form>
      )}

      {/* Blog Cards */}
      <div className="bg-[#f1f5f9] p-8 rounded-xl shadow-md mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog, index) => (
            <div key={index} className="relative group">
              {/* Transparent cross button */}
              <button
                onClick={() => confirmDelete(index)}
                className="absolute top-2 right-2 text-black text-xl font-bold z-50 hover:text-red-600 transition-colors duration-200"
              >
                ×
              </button>
              <ModuleCard {...blog} />
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-40"></div>

          {/* Popup content */}
          <div className="relative bg-white p-6 rounded-lg shadow-lg text-center z-50 max-w-sm mx-4">
            <p className="mb-4 font-semibold text-gray-800">
              Are you sure you want to delete this blog?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter */}
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
