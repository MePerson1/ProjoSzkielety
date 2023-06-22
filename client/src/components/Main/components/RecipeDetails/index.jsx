const RecipeDetails = (props) => {
  const recipe = props.recipe;
  return (
    <>
      <div>
        <p>{recipe.title}</p>
        <p>{recipe.time}</p>
      </div>
    </>
  );
};
export default RecipeDetails;
