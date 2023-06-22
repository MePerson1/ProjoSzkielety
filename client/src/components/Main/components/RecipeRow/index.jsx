const RecipeRow = (props) => {
  const recipe = props.recipe;
  const tags = recipe.tags;
  return (
    <div class="bg-slate-400 p-3 border border-2 border-black">
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
