import styles from "./styles.module.css";
import Users from "./components/Users";
import Info from "./components/Info";
import axios from "axios";
import { useState, useEffect } from "react";
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
const Main = () => {
  const [dane, ustawDane] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [info, ustawInfo] = useState(null);
  const [form, setForm] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    //pobierz token z localStorage:
    const token = localStorage.getItem("token");
    if (token) {
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
          setUser(data);
          console.log(user);
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
      console.log(user);
    }
  }, []);

  const handleGetUser = () => {};
  const handleGetUsers = async (e) => {
    e.preventDefault();
    ustawInfo(null);
    //pobierz token z localStorage:
    const token = localStorage.getItem("token");
    //jeśli jest token w localStorage to:
    if (token) {
      try {
        //konfiguracja zapytania asynchronicznego z tokenem w nagłówku:
        const config = {
          method: "get",
          url: "http://localhost:8080/api/users",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        };
        //wysłanie żądania o dane:
        const { data: res } = await axios(config);
        //ustaw dane w komponencie za pomocą hooka useState na listę z danymi przesłanymi
        //z serwera – jeśli został poprawnie zweryfikowany token
        ustawDane(res.data); // `res.data` - zawiera sparsowane dane – listę
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      }
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    //pobierz token z localStorage:
    const token = localStorage.getItem("token");

    //jeśli jest token w localStorage to:
    if (token) {
      const retVal = window.confirm("Do you want to continue ?");
      if (retVal == true) {
        try {
          //konfiguracja zapytania asynchronicznego z tokenem w nagłówku:
          const config = {
            method: "delete",
            url: "http://localhost:8080/api/users",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
          };
          localStorage.removeItem("token");
          window.location.reload();
        } catch (error) {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
            localStorage.removeItem("token");
            window.location.reload();
          }
        }
      } else {
        return false;
      }
    }
  };
  const handleGetRecipes = async (e) => {
    e.preventDefault();
    setForm(false);
    //pobierz token z localStorage:
    const token = localStorage.getItem("token");
    if (token) {
      try {
        console.log("");
        //konfiguracja zapytania asynchronicznego z tokenem w nagłówku:
        const config = {
          method: "get",
          url: "http://localhost:8080/api/recipes",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        };
        //wysłanie żądania o dane:
        const { data: res } = await axios(config);
        console.log(res.data);
        //ustaw dane w komponencie za pomocą hooka useState na listę z danymi przesłanymi
        //z serwera – jeśli został poprawnie zweryfikowany token
        setUserRecipes(res.data); // `res.data` - zawiera sparsowane dane – listę
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          console.log("nie dziala!");
          localStorage.removeItem("token");
          window.location.reload();
        }
      }
    }
  };
  const handleRecipeForm = () => {
    ustawDane([]);
    setForm(true);
  };
  //potrzebuje zeby useeffect pobieral dane o userze i guess
  const handleUserRecipes = async (e) => {
    e.preventDefault();
    setForm(false);

    //pobierz token z localStorage:
    const token = localStorage.getItem("token");

    if (token) {
      try {
        //konfiguracja zapytania asynchronicznego z tokenem w nagłówku:
        const config = {
          method: "get",
          url: `http://localhost:8080/api/recipes/${user._id}/user`,
        };
        //wysłanie żądania o dane:
        const { data: res } = await axios(config);
        console.log(res.data);
        //ustaw dane w komponencie za pomocą hooka useState na listę z danymi przesłanymi
        //z serwera – jeśli został poprawnie zweryfikowany token
        ustawDane(res.data);
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          console.log("nie dziala!");
        }
      }
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <img className={styles.logo} src="logo.png" alt="logo" />
        <button className={styles.white_btn} onClick={handleGetRecipes}>
          Przepisy
        </button>
        <button className={styles.white_btn} onClick={handleUserRecipes}>
          Twoje przepisy
        </button>
        <button className={styles.white_btn} onClick={handleRecipeForm}>
          Dodaj przepis
        </button>
        <button className={styles.white_btn} onClick={console.log(user)}>
          Konto
        </button>
        <button className={styles.white_btn} onClick={handleLogout}>
          Wyloguj
        </button>
      </nav>
      {dane.length > 0 ? (
        <RecipeList className="bg-yellow" recipes={dane} />
      ) : (
        <p></p>
      )}
      {info != null ? <Info info={info} /> : <p></p>}
      {form && <RecipeForm user={user} />}
      {userRecipes.length > 0 && (
        <RecipeList recipes={userRecipes} user={user} />
      )}
    </div>
  );
};
export default Main;
