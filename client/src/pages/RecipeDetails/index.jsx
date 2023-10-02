import React from "react";

const RecipeDetails = ({ recipieDetails }) => {
  const title = recipieDetails?.title || "Loading...";
  const time = recipieDetails?.time || 0;
  const ingridients = recipieDetails?.ingridients || [];
  const instructions = recipieDetails?.instruction || [];
  const tags = recipieDetails?.tags || [];
  const description = recipieDetails?.description || "Loading...";

  return (
    <div className="bg-orange-100 rounded-xl p-6 shadow-xl">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <div className="mb-4">
        <p className="text-lg text-gray-700">Czas przygotowania: {time} min</p>
      </div>
      <div className="flex flex-wrap mb-4">
        {tags.map((tag) => (
          <p
            className="bg-orange-200 text-black rounded-md py-1 px-2 mr-2 mb-2 text-sm"
            key={tag}
          >
            {tag}
          </p>
        ))}
      </div>
      <div className="mb-4">
        <p className="text-base text-gray-800">{description}</p>
      </div>
      <div className="mb-4">
        <ul className="list-disc list-inside">
          {ingridients.map((ingredient, index) => (
            <li key={index} className="text-base text-gray-800">
              {ingredient.name} - {ingredient.quantity} {ingredient.measure}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="mb-2 text-2xl font-semibold">Instrukcja:</h2>
        <ol className="list-decimal pl-6 text-base text-gray-800">
          {instructions.map((instr, index) => (
            <li key={index}>{instr}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetails;
