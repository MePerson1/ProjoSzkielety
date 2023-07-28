import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./styles.module.css";
const RecipeRow = ({ recipe, token, setRecipieDetails, setRecipe }) => {
  const tags = recipe.tags;
  const isLogged = token;
  let navigate = useNavigate();
  const handleDetails = () => {
    if (recipe) {
      setRecipieDetails(recipe);
      navigate("/details");
    }
  };

  const handleRemoveRecipe = async (e) => {
    e.preventDefault();
    console.log(recipe);
    const token = localStorage.getItem("token");
    if (token) {
      const retVal = window.confirm("Chcesz kontynuowac?");
      if (retVal == true) {
        try {
          const config = {
            method: "delete",
            url: "http://localhost:8080/api/recipes",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
            data: recipe,
          };
          const { data: res } = await axios(config);

          console.log(res.message);
          window.location.reload();
          navigate("/");
        } catch (error) {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
            console.log(error);
          }
        }
      }
    }
  };

  const handleUpdateRecipe = async (e) => {
    setRecipe(recipe);
    navigate("/form");
  };
  return (
    <div className="p-3 ml-28 w-96 border border-orange-900 rounded-xl">
      <h2 className="text-3xl text-center bg-orange-100 justify-center content-center">
        {recipe.title}
      </h2>
      <p className="text-center font-semibold">Czas: {recipe.time} min</p>
      <div className="flex p-2 bg-orange-700 bg-transparent rounded">
        <p className="text-white">Tagi:</p>
        {tags.map((tag) => {
          return (
            <p className="bg-white m-2 p-1 rounded w-min border border-black border-">
              {tag}
            </p>
          );
        })}
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={handleDetails}
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
        >
          Sczegóły
        </button>
        {isLogged && (
          <button
            onClick={handleRemoveRecipe}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Usuń
          </button>
        )}
        {isLogged && (
          <button
            onClick={handleUpdateRecipe}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Edytuj
          </button>
        )}
      </div>
    </div>
  );
};
export default RecipeRow;
