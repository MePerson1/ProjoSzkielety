import RecipeRow from "../RecipeRow";

import styles from "./styles.module.css";
const RecipeList = (props) => {
  const recipes = props.recipes;
  const user = props.user;
  return (
    <>
      <div className={styles.heading}>
        {user && <p>{user.name} przepisy</p>}
        {!user && <p>Przepisy</p>}
      </div>

      <div>
        {recipes.map((recipe) => {
          return (
            <RecipeRow key={recipe._id} value={recipe._id} recipe={recipe} />
          );
        })}
      </div>
    </>
  );
};
export default RecipeList;
