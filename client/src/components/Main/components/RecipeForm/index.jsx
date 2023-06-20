import { useState, useEffect } from "react";
const RecipeForm = () => {
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: 0, measure: "" },
    { name: "", quantity: 0, measure: "" },
  ]);
  const [instructions, setInstructions] = useState([""]);
  const [tags, setTags] = useState([""]);
  const [recipe, setRecipe] = useState([
    {
      title: "",
      description: "",
      ingredients: [{ name: "", quantity: 0, measure: "" }],
      instructions: [],
      tags: [],
      created_at: "",
      created_by: "",
      is_private: false,
    },
  ]);
  const [isPrivate, setIsPrivate] = useState(false);

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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(ingredients);
    console.log(instructions);
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

  return (
    <>
      <div className="recipeForm">
        <form>
          <label htmlFor="title">Tytuł:</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Tytul"
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
                />
                <input
                  type="number"
                  name="quantity"
                  placeholder="Wartosc"
                  value={input.quantity}
                  onChange={(event) => handleIngridientsOnChange(index, event)}
                />
                <input
                  type="text"
                  name="measure"
                  placeholder="Miara"
                  value={input.measure}
                  onChange={(event) => handleIngridientsOnChange(index, event)}
                />
                <button type="button" onClick={() => removeIngridient(index)}>
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
