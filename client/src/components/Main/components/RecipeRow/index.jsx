const RecipeRow = (props) => {
  const recipe = props.recipe;
  return <li> {recipe.title} </li>;
};
export default RecipeRow;
