import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";
const RecipeForm = (props) => {
  const userId = props.user._id;
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: 0, measure: "" },
    { name: "", quantity: 0, measure: "" },
  ]);
  const [error, setError] = useState("");
  const [instructions, setInstructions] = useState([""]);
  const [tags, setTags] = useState([""]);
  const [recipe, setRecipe] = useState([
    {
      title: "",
      description: "",
      time: 0,
      ingredients: [{ name: "", quantity: 0, measure: "" }],
      instructions: [],
      tags: [],
      created_at: "",
      created_by: "",
      is_private: false,
    },
  ]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(0);

  const handleAddIngredientInput = () => {
    let newfield = { name: "", quantity: 0, measure: "" };
    setIngredients([...ingredients, newfield]);
    console.log(ingredients);
  };

  const handleAddInstructionInput = () => {
    let newfield = "";
    setInstructions([...instructions, newfield]);
    console.log(instructions);
  };

  const handleAddTagInput = () => {
    let newfield = "";
    setTags([...tags, newfield]);
    console.log(tags);
  };

  const handleIngridientsOnChange = (index, event) => {
    let data = [...ingredients];
    data[index][event.target.name] = event.target.value;
    setIngredients(data);
  };

  const handleInstructionsOnChange = (index, event) => {
    let data = [...instructions];
    data[index] = event.target.value;
    setInstructions(data);
  };

  const handleTagsOnChange = (index, event) => {
    let data = [...tags];
    data[index] = event.target.value;
    setTags(data);
  };

  const removeIngridient = (index) => {
    let data = [...ingredients];
    data.splice(index, 1);
    setIngredients(data);
  };

  const removeInstraction = (index) => {
    let data = [...instructions];
    data.splice(index, 1);
    setInstructions(data);
  };

  const removeTag = (index) => {
    let data = [...tags];
    data.splice(index, 1);
    setTags(data);
  };
  const handleChange = ({ currentTarget: input }) => {
    setRecipe({ ...recipe, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dummyRecipe = {
      title: recipe.title,
      description: recipe.description,
      time: recipe.time,
      ingridients: ingredients,
      instruction: instructions,
      tags: tags,
      created_at: Date.now(),
      created_by: userId,
      is_private: false,
    };
    //ustawienie zmiennych
    setRecipe({ ...recipe, ingredients: ingredients });
    setRecipe({ ...recipe, instruction: instructions });
    setRecipe({ ...recipe, tags: tags });
    setRecipe({ ...recipe, created_by: userId });
    console.log(dummyRecipe);
    const token = localStorage.getItem("token");
    try {
      const config = {
        method: "post",
        url: "http://localhost:8080/api/recipes",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        data: dummyRecipe,
      };
      const { data: res } = await axios(config);

      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="recipeForm">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Tytuł:</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Tytul"
            onChange={handleChange}
            value={recipe.title}
            required
          ></input>
          <label htmlFor="description">Tytuł:</label>
          <input
            id="description"
            type="text"
            name="description"
            placeholder="opis"
            onChange={handleChange}
            value={recipe.description}
            required
          ></input>
          <input
            id="time"
            type="text"
            name="time"
            placeholder="czas"
            onChange={handleChange}
            value={recipe.time}
            required
          ></input>
          <p>Skladniki</p>
          {ingredients.map((input, index) => {
            return (
              <div key={index}>
                <input
                  type="text"
                  name="name"
                  placeholder="Nazwa"
                  value={input.name}
                  onChange={(event) => handleIngridientsOnChange(index, event)}
                  required
                />
                <input
                  type="number"
                  name="quantity"
                  placeholder="Wartosc"
                  value={input.quantity}
                  onChange={(event) => handleIngridientsOnChange(index, event)}
                  required
                />
                <input
                  type="text"
                  name="measure"
                  placeholder="Miara"
                  value={input.measure}
                  onChange={(event) => handleIngridientsOnChange(index, event)}
                  required
                />
                <button
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2"
                  type="button"
                  onClick={() => removeIngridient(index)}
                >
                  Usuń
                </button>
              </div>
            );
          })}
          <button type="button" onClick={handleAddIngredientInput}>
            Dodaj więcej składników
          </button>
          <p>Instrukcja</p>
          {instructions.map((input, index) => {
            return (
              <div key={index}>
                <label>{index + 1 + "."}</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={input}
                  onChange={(event) => handleInstructionsOnChange(index, event)}
                  required
                />
                <button type="button" onClick={() => removeInstraction(index)}>
                  Usuń
                </button>
              </div>
            );
          })}
          <button type="button" onClick={handleAddInstructionInput}>
            Add more ingridients
          </button>
          <p>Tagi</p>
          {tags.map((input, index) => {
            return (
              <div key={index}>
                <input
                  type="text"
                  name="tag"
                  placeholder="Tag"
                  value={input}
                  onChange={(event) => handleTagsOnChange(index, event)}
                  required
                />
                <button type="button" onClick={() => removeTag(index)}>
                  Usuń
                </button>
              </div>
            );
          })}
          <button type="button" onClick={handleAddTagInput}>
            Add more ingridients
          </button>
          <div>
            {/* zmienic na checkbutton */}
            {/* Przyw wyswietlaniu przepsu mozna dodac licznik w zaleznosci od miary :D */}
            <input
              id="privacy"
              type="checkbox"
              name="privacy"
              value="private"
              onChange={() => setIsPrivate(true)}
            />
            <label htmlFor="privacy">Private</label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default RecipeForm;
