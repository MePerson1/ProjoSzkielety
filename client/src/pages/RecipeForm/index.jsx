import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";
const RecipeForm = ({ recipe, onClear, onUpdate, onSubmit, user }) => {
  const [userId,setUserId] = useState("");
  let navigate = useNavigate();
  const [ingridients, setIngredients] = useState([
    { name: "", quantity: 0, measure: "" },
    { name: "", quantity: 0, measure: "" },
  ]);
  const [error, setError] = useState("");
  const [instruction, setInstruction] = useState([""]);
  const [tags, setTags] = useState([""]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(0);
  const [id, setId] = useState(0);
  const isUpdate = id !== 0;
  useEffect(() => {
    if (recipe) {
      if(recipe._id)
      {setId(recipe._id);}
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
    if(user)
    {
      setUserId(user._id);
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

  };

  const handleClear = () =>{
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
      onClear();
  }
  const handleUpdate = () => {
    const _id = id;
    const created_at = Date.now();
    const created_by = userId;
    const is_private = isPrivate;
    onUpdate({
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
    <div className="recipeForm bg-orange-100 p-6 rounded-xl shadow-xl">
      <form onSubmit={(event) => event.preventDefault()} className="space-y-4">
        <label htmlFor="title" className="text-lg text-gray-800">
          Tytuł:
        </label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="Tytul"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          className="inputField"
        ></input>
        <label htmlFor="description" className="text-lg text-gray-800">
          Opis:
        </label>
        <input
          id="description"
          type="text"
          name="description"
          placeholder="Opis"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
          className="inputField"
        ></input>
        <label htmlFor="time" className="text-lg text-gray-800">
          Czas przygotowania (w minutach):
        </label>
        <input
          id="time"
          type="text"
          name="time"
          placeholder="Czas"
          onChange={(e) => setTime(e.target.value)}
          value={time}
          required
          className="inputField"
        ></input>
        <p className="text-lg text-gray-800">Składniki:</p>
        {ingridients.map((input, index) => {
          return (
            <div key={index} className="flex space-x-4">
              <input
                type="text"
                name="name"
                placeholder="Nazwa"
                value={input.name}
                onChange={(event) => handleIngridientsOnChange(index, event)}
                required
                className="inputField"
              />
              <input
                type="number"
                name="quantity"
                placeholder="Wartość"
                value={input.quantity}
                onChange={(event) => handleIngridientsOnChange(index, event)}
                required
                className="inputField"
              />
              <input
                type="text"
                name="measure"
                placeholder="Miara"
                value={input.measure}
                onChange={(event) => handleIngridientsOnChange(index, event)}
                required
                className="inputField"
              />
              <button
                className="btnRemove"
                type="button"
                onClick={() => removeIngridient(index)}
              >
                Usuń
              </button>
            </div>
          );
        })}
        <button
          type="button"
          onClick={handleAddIngredientInput}
          className="btnAdd"
        >
          Dodaj więcej składników
        </button>
        <p className="text-lg text-gray-800">Instrukcja:</p>
        {instruction.map((input, index) => {
          return (
            <div key={index} className="flex space-x-4">
              <label className="instructionStep">{index + 1 + "."}</label>
              <input
                type="text"
                name="name"
                placeholder="Krok"
                value={input}
                onChange={(event) => handleInstructionsOnChange(index, event)}
                required
                className="inputField"
              />
              <button
                type="button"
                onClick={() => removeInstraction(index)}
                className="btnRemove"
              >
                Usuń
              </button>
            </div>
          );
        })}
        <button
          type="button"
          onClick={handleAddInstructionInput}
          className="btnAdd"
        >
          Dodaj więcej kroków
        </button>
        <p className="text-lg text-gray-800">Tagi:</p>
        {tags.map((input, index) => {
          return (
            <div key={index} className="flex space-x-4">
              <input
                type="text"
                name="tag"
                placeholder="Tag"
                value={input}
                onChange={(event) => handleTagsOnChange(index, event)}
                required
                className="inputField"
              />
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="btnRemove"
              >
                Usuń
              </button>
            </div>
          );
        })}
        <button type="button" onClick={handleAddTagInput} className="btnAdd">
          Dodaj więcej tagów
        </button>
        <div className="flex items-center space-x-2">
          <input
            id="privacy"
            type="checkbox"
            name="privacy"
            value="private"
            onChange={() => setIsPrivate((state) => !state)}
            className="checkbox"
          />
          <label htmlFor="privacy" className="text-lg text-gray-800">
            Prywatne
          </label>
        </div>
        {!isUpdate && (
          <button type="submit" onClick={handleSubmit} className="bg-green-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Wyślij
          </button>
        )}
        <button type="reset" onClick={handleClear} className="bg-red-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Wyczyść
        </button>
        {isUpdate && (
          <button type="submit" onClick={handleUpdate} className="bg-green-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Zatwierdź zmiany
          </button>
        )}
      </form>
    </div>
  );
};

export default RecipeForm;
