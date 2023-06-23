const RecipeDetails = ({ recipieDetails }) => {
  return (
    <>
      <div>{recipieDetails && <p>{recipieDetails.title}</p>}</div>
    </>
  );
};
export default RecipeDetails;
