import RecipeRow from "../RecipeRow";
import axios from "axios";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
const RecipeUserList = ({ setRecipe, setRecipieDetails }) => {
  const [userRecipies, setUserRecipies] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      const config = {
        method: "get",
        url: "http://localhost:8080/api/recipes/userRecipes",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      axios(config)
        .then((res) => {
          const data = res.data.data;
          console.log(data);
          setUserRecipies(data);
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
            console.log("nie dziala!");
            // localStorage.removeItem("token");
            // window.location.reload();
          }
        });
    }
  }, []);
  return (
    <>
      <div className={styles.heading}>
        <p>Twoje przepisy</p>
      </div>

      <div className="flex">
        {userRecipies &&
          userRecipies.map((recipe) => {
            return (
              <RecipeRow
                key={recipe._id}
                value={recipe._id}
                recipe={recipe}
                token={token}
                setRecipieDetails={setRecipieDetails}
                setRecipe={setRecipe}
              />
            );
          })}
        {!userRecipies && <h2>Pusto</h2>}
      </div>
    </>
  );
};

export default RecipeUserList;
