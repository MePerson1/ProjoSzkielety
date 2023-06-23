import { useNavigate } from "react-router-dom";
import axios from "axios";
const RecipeRow = ({ recipe, user, setRecipieDetails }) => {
  const tags = recipe.tags;
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

  const handleUpdateRecipe = async (e) => {};
  return (
    <div class="bg-slate-400 p-3 border border-2 border-black">
      <p>{recipe.title}</p>
      <p>{recipe._id}</p>
      {tags.map((tag) => {
        return <p>{tag}</p>;
      })}
      <div>
        <button onClick={handleDetails}>Sczegóły</button>
        {user && <button onClick={handleRemoveRecipe}>Usuń</button>}
        {user && <button onClick={handleUpdateRecipe}>Edytuj</button>}
      </div>
    </div>
  );
};
export default RecipeRow;
