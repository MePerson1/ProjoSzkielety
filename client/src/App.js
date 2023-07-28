import {
  Route,
  Routes,
  Navigate,
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
import Main from "./components/Main";
import NavBar from "./components/NavBar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import RecipeDetails from "./pages/RecipeDetails";
import "./App.css";
import axios from "axios";
import NotFound from "./pages/NotFound";
import RecipeList from "./pages/RecipeList";
import { useState, useEffect } from "react";
import RecipeForm from "./pages/RecipeForm";
import RecipeUserList from "./pages/RecipeUserList";
function App() {
  const navigator = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const [recipieDetails, setRecipieDetails] = useState(null);
  const [recipies, setRecipies] = useState(null);
  const [user, setUser] = useState(null);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    console.log("");
    //konfiguracja zapytania asynchronicznego z tokenem w nagłówku:
    const url = "http://localhost:8080/api/recipes";
    //wysłanie żądania o dane:
    axios
      .get(url)
      .then((res) => {
        const data = res.data;
        console.log(data.data);
        setRecipies(data.data);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          console.log("nie dziala!");
        }
      });

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

  const onSubmit = (recipe) => {
    if (!recipe) {
      return;
    }
    const token = localStorage.getItem("token");
    const config = {
      method: "post",
      url: "http://localhost:8080/api/recipes",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      data: recipe,
    };
    axios(config)
      .then((res) => {
        setRecipe(null);
        navigator("/yours", { replace: true });
      })
      .catch((error) => {
        if (error.response.status == 401) {
          console.log("Nie dozwolone!");
          localStorage.removeItem("token");
          window.location.reload();
        }
      });
  };

  const onUpdate = (recipe) => {
    if (!recipe) {
      return;
    }
    const token = localStorage.getItem("token");
    const recipeId = recipe._id; // Get the recipe ID
    const url = `http://localhost:8080/api/recipes/${recipeId}`; // Construct the URL

    const config = {
      method: "put",
      url: url, // Pass the URL as a separate argument
      headers: {
        "x-access-token": token,
      },
      data: recipe,
    };

    axios
      .request(config) // Use axios.request() instead of axios.put()
      .then((res) => {
        setRecipe(null);

        navigator("/yours", { replace: true });
      })
      .catch((error) => {
        if (error.response.status == 401) {
          console.log("nie dziala!");
          localStorage.removeItem("token");
          window.location.reload();
        }
      });
  };

  const onClear = () => {
    setRecipe(null);
  };
  return (
    <>
      <header>
        <NavBar token={token} handleLogout={handleLogout} />
      </header>

      <Routes>
        <Route
          path="/"
          exact
          element={
            <RecipeList
              recipies={recipies}
              setRecipieDetails={setRecipieDetails}
            />
          }
        />
        <Route path="signup" exact element={<Signup />} />
        <Route path="login" exact element={<Login />} />
        <Route path="signup" exact element={<Signup />} />

        <Route
          path="yours"
          exact
          element={
            <RecipeUserList
              user={user}
              setRecipe={setRecipe}
              setRecipieDetails={setRecipieDetails}
            />
          }
        />
        <Route
          path="details"
          exact
          element={<RecipeDetails recipieDetails={recipieDetails} />}
        />
        <Route
          path="form"
          element={
            <RecipeForm
              onSubmit={onSubmit}
              onClear={onClear}
              onUpdate={onUpdate}
              recipe={recipe}
              user={user}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;
