import RecipeRow from "../RecipeRow";
import axios from "axios";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
const RecipeUserList = ({ setRecipe, setRecipieDetails }) => {
  const [userRecipies, setUserRecipies] = useState(null);
  const token = localStorage.getItem("token");
  const [loggedUser, setLogged] = useState(null);
  useEffect(() => {
    const url = "http://localhost:8080/api/users/info";
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": token,
    };

    axios
      .get(url, { headers })
      .then((res) => {
        const data = res.data;
        console.log(data);
        setLogged(data);
        console.log(loggedUser);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          console.log("nie dziala!");
          localStorage.removeItem("token");
          window.location.reload();
        }
      });

    if (loggedUser) {
      const config = {
        method: "get",
        url: `http://localhost:8080/api/recipes/${loggedUser._id}/user`,
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
        {loggedUser ? <p>Twoje przepisy</p> : <p>Przepisy</p>}
      </div>

      <div className="flex">
        {userRecipies &&
          userRecipies.map((recipe) => {
            return (
              <RecipeRow
                key={recipe._id}
                value={recipe._id}
                recipe={recipe}
                user={loggedUser}
                setRecipieDetails={setRecipieDetails}
                setRecipe={setRecipe}
              />
            );
          })}
        {!userRecipies && <h2>Pusto, dodaj nowy przpis</h2>}
      </div>
    </>
  );
};

export default RecipeUserList;
