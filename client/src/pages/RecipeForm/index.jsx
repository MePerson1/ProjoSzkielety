import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";
const RecipeForm = ({ recipe, onClear, onUpdate, onSubmit, user }) => {
  const userId = user._id;
  const [ingridients, setIngredients] = useState([
    { name: "", quantity: 0, measure: "" },
    { name: "", quantity: 0, measure: "" },
  ]);
  const [error, setError] = useState("");
  const [instruction, setInstruction] = useState([""]);
  const [tags, setTags] = useState([""]);
  // const [recipe, setRecipe] = useState([
  //   {
  //     title: "",
  //     description: "",
  //     time: 0,
  //     ingredients: [{ name: "", quantity: 0, measure: "" }],
  //     instructions: [],
  //     tags: [],
  //     created_at: "",
  //     created_by: "",
  //     is_private: false,
  //   },
  // ]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(0);
  const [id, setId] = useState(0);
  const isUpdate = id !== 0;
  useEffect(() => {
    if (recipe) {
      setId(recipe._id);
      setTitle(recipe.title);
      setDescription(recipe.description);
      setTime(recipe.time);
      setIngredients(recipe.ingridients);
      setInstruction(recipe.instruction);
      setTags(recipe.tags);
      setIsPrivate(recipe.is_private);
    } else {
      setId(0);
      setTitle("");
      setDescription("");
      setTime(0);
      setIngredients([
        { name: "", quantity: 0, measure: "" },
        { name: "", quantity: 0, measure: "" },
      ]);
      setInstruction([""]);
      setTags([""]);
      setIsPrivate(false);
    }
  }, []);
  const handleAddIngredientInput = () => {
    let newfield = { name: "", quantity: 0, measure: "" };
    setIngredients([...ingridients, newfield]);
    console.log(ingridients);
  };

  const handleAddInstructionInput = () => {
    let newfield = "";
    setInstruction([...instruction, newfield]);
  };

  const handleAddTagInput = () => {
    let newfield = "";
    setTags([...tags, newfield]);
    console.log(tags);
  };

  const handleIngridientsOnChange = (index, event) => {
    let data = [...ingridients];
    data[index][event.target.name] = event.target.value;
    setIngredients(data);
  };

  const handleInstructionsOnChange = (index, event) => {
    let data = [...instruction];
    data[index] = event.target.value;
    setInstruction(data);
  };

  const handleTagsOnChange = (index, event) => {
    let data = [...tags];
    data[index] = event.target.value;
    setTags(data);
  };

  const removeIngridient = (index) => {
    let data = [...ingridients];
    data.splice(index, 1);
    setIngredients(data);
  };

  const removeInstraction = (index) => {
    let data = [...instruction];
    data.splice(index, 1);
    setInstruction(data);
  };

  const removeTag = (index) => {
    let data = [...tags];
    data.splice(index, 1);
    setTags(data);
  };

  const handleSubmit = () => {
    const created_at = Date.now();
    const created_by = userId;
    const is_private = isPrivate;
    onSubmit({
      title,
      description,
      time,
      ingridients,
      instruction,
      tags,
      is_private,
      created_at,
      created_by,
    });
    // e.preventDefault();
    // const dummyRecipe = {
    //   title: title,
    //   description: description,
    //   time: time,
    //   ingridients: ingredients,
    //   instruction: instructions,
    //   tags: tags,
    //   created_at: Date.now(),
    //   created_by: userId,
    //   is_private: isPrivate,
    // };

    // console.log(dummyRecipe);
    // const token = localStorage.getItem("token");
    // try {
    //   const config = {
    //     method: "post",
    //     url: "http://localhost:8080/api/recipes",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "x-access-token": token,
    //     },
    //     data: dummyRecipe,
    //   };
    //   const { data: res } = await axios(config);

    //   console.log(res.message);
    // } catch (error) {
    //   if (
    //     error.response &&
    //     error.response.status >= 400 &&
    //     error.response.status <= 500
    //   ) {
    //     setError(error.response.data.message);
    //   }
    // }
  };

  const handleUpdate = () => {
    const _id = id;
    const created_at = Date.now();
    const created_by = userId;
    const is_private = isPrivate;
    onSubmit({
      _id,
      title,
      description,
      time,
      ingridients,
      instruction,
      tags,
      is_private,
      created_at,
      created_by,
    });
  };

  return (
    <>
      <div className="recipeForm">
        <form onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="title">Tytuł:</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Tytul"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          ></input>
          <label htmlFor="description">Tytuł:</label>
          <input
            id="description"
            type="text"
            name="description"
            placeholder="opis"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></input>
          <input
            id="time"
            type="text"
            name="time"
            placeholder="czas"
            onChange={(e) => setTime(e.target.value)}
            value={time}
            required
          ></input>
          <p>Skladniki</p>
          {ingridients.map((input, index) => {
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
          {instruction.map((input, index) => {
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
              onChange={() => setIsPrivate((state) => !state)}
            />
            <label htmlFor="privacy">Private</label>
          </div>
          {!isUpdate && (
            <button type="submit" onClick={handleSubmit}>
              Wyślij
            </button>
          )}
          <button type="reset">Clear</button>
          {isUpdate && (
            <button type="submit" onClick={handleUpdate}>
              Zatwierdź zmiany
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default RecipeForm;
