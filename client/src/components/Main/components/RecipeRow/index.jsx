const RecipeRow = (props) => {
  const recipe = props.recipe;
  const tags = recipe.tags;
  return (
    <div>
      <p>{recipe.title}</p>
      {tags.map((tag) => {
        return <p>{tag}</p>;
      })}
      <div>
        <button>Sczegóły</button>
      </div>
    </div>
  );
};
export default RecipeRow;
