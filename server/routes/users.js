const router = require("express").Router();
const { User, validate } = require("../models/user");
const { Recipe } = require("../models/recipe");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });
    user = await User.findOne({ username: req.body.username });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given username already Exist!" });
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
  5;
});

router.get("/", async (req, res) => {
  //pobranie wszystkich użytkowników z bd:
  User.find()
    .exec()
    .then(async () => {
      const users = await User.find();
      //konfiguracja odpowiedzi res z przekazaniem listy użytkowników:
      res.status(200).send({ data: users, message: "Lista użytkowników" });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

//user po tokenie
router.get("/info", async (req, res) => {
  try {
    let userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//użytkownik po id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user == null) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ data: user, message: "User details" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//usuwanie użytkownika
router.delete("/", async (req, res) => {
  const user = req.user;
  try {
    User.findByIdAndDelete(user._id);
    res.status(200).send({ message: "Uzytkownik usunięty!" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//dodanie przepisu do ulubionych
router.post("/:userId/favorites/:recipeId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const recipeId = req.params.recipeId;

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    // Find the recipe by recipeId

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).send({ message: "Recipe not found" });
    }
    // Check if the recipe is already a favorite for the user
    const isFavorite = user.fav_recipes.includes(recipeId);
    if (isFavorite) {
      return res
        .status(409)
        .send({ message: "Recipe already added as favorite" });
    }

    // Add the recipe to the user's favorite recipes list
    user.fav_recipes.push(recipeId);
    await user.save();

    res.status(200).send({ message: "Recipe added as favorite" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
