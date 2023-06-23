const router = require("express").Router();
const { Recipe, validate } = require("../models/recipe");
const { User } = require("../models/user");

// Trasa do tworzenia nowego przepisu
router.post("/", async (req, res) => {
  try {
    // Walidacja danych wejściowych
    console.log(req.body);
    const { error } = validate(req.body);
    if (error) {
      console.log(error.details[0].message);
      return res.status(400).send({ message: error.details[0].message });
    }

    // Tworzenie nowego przepisu na podstawie danych z żądania
    const recipe = new Recipe(req.body);

    // Zapisanie przepisu w bazie danych
    await recipe.save();

    res
      .status(201)
      .send({ message: "Recipe created successfully", data: recipe });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Trasa do pobierania wszystkich przepisów
router.get("/", async (req, res) => {
  try {
    // Pobranie wszystkich przepisów z bazy danych
    const recipes = await Recipe.find();

    res.status(200).send({ data: recipes, message: "List of recipes" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Trasa do pobierania pojedynczego przepisu
router.get("/:id", async (req, res) => {
  try {
    // Pobranie pojedynczego przepisu na podstawie identyfikatora (id)
    const recipe = await Recipe.findById(req.params.id);

    if (recipe == null) {
      return res.status(404).send({ message: "Recipe not found" });
    }

    res.status(200).send({ data: recipe, message: "Recipe details" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Trasa do pobierania przepisów użytkownika
router.get("/:id/user", async (req, res) => {
  try {
    let userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const recipes = await Recipe.find({ created_by: userId });
    if (recipes.length === 0) {
      return res
        .status(404)
        .send({ message: "No recipes found for the user." });
    }

    res.status(200).send({ data: recipes, message: "Recipes for the user." });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

// Trasa do aktualizacji przepisu
router.put("/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;
    const updatedRecipeData = req.body;

    // Check if the updated recipe data is provided
    if (!updatedRecipeData) {
      return res
        .status(400)
        .send({ message: "Updated recipe data is required!" });
    }

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).send({ message: "Recipe not found!" });
    }

    // Update the recipe with the updated recipe data
    Object.assign(recipe, updatedRecipeData);
    const updatedRecipe = await recipe.save();

    res.status(200).send({ updatedRecipe: updatedRecipe });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Trasa do usuwania przepisu
router.delete("/", async (req, res) => {
  try {
    const recipeId = req.body._id;
    console.log(recipeId);
    // Usunięcie przepisu na podstawie identyfikatora (id)
    if (recipeId) {
      const recipe = await Recipe.findByIdAndDelete(recipeId);
      console.log("dziala");
      res.status(200).send({ message: "Recipe deleted successfully" });
    }

    if (!recipeId) {
      console.log("nie dziala");
      return res.status(404).send({ message: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Eksportowanie routera
module.exports = router;
