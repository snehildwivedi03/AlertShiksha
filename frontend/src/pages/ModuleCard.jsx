import React from "react";

const ModuleCard = ({ title, type, url, description, img }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col">
      {/* Video Preview / Thumbnail */}
      {type === "video" ? (
        <div className="w-full aspect-video">
          <iframe
            src={url}
            title={title}
            className="w-full h-full rounded-t-xl"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="relative w-full h-48">
          <img src={img} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Content */}
      <div className="p-4 text-center flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-[#20538c] mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-1">{description}</p>

        {type !== "video" && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#20538c] text-white px-4 py-2 rounded-md hover:bg-[#1b436b] transition-colors duration-300"
          >
            {type === "pdf" ? "View PDF" : "Take Quiz"}
          </a>
        )}
      </div>
    </div>
  );
};

export default ModuleCard;
