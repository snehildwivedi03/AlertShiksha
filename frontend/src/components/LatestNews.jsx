import React from "react";

const LatestNews = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold text-[#20538c] mb-4">Latest News</h3>
      <ul className="space-y-3 text-sm text-gray-700">
        <li>🌊 Flood warnings issued in Northern Punjab</li>
        <li>🔥 Mock fire drill conducted in Ludhiana schools</li>
        <li>🌍 Earthquake preparedness workshop in Amritsar</li>
      </ul>
    </div>
  );
};

export default LatestNews;
