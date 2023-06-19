import RecipeRow from "../RecipeRow";

const RecipeList = (props) => {
  const recipes = props.recipes;
  const userName = props.userName;
  return (
    <>
      {userName && <h2>{userName} przepisy</h2>}
      {!userName && <h2>Przepisy</h2>}
      <ul>
        {recipes.map((recipe) => {
          return (
            <RecipeRow key={recipe._id} value={recipe._id} recipe={recipe} />
          );
        })}
      </ul>
    </>
  );
};
export default RecipeList;
