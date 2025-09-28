import React from "react";

const ModuleCard = ({ title, description, img, buttonText, onButtonClick }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200 flex flex-col">
      <img src={img} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-[#1d4e89]">{title}</h3>
        <p className="text-gray-600 mt-2 flex-1">{description}</p>
        {buttonText && onButtonClick && (
          <button
            onClick={onButtonClick}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ModuleCard;
