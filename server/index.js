const tokenVerification = require("./middleware/tokenVerification");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipes");

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
connection();
//middleware
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`));

//Autoryzacja
app.get("/api/users/", tokenVerification);
app.use("/api/auth", authRoutes);

//user
app.use("/api/users", userRoutes);
app.use("/api/users/info", userRoutes);
app.use("/api/users/:userId/favorites/:recipeId", userRoutes);

//przepisy
app.use("/api/recipes", recipeRoutes);
app.use("/api/recipes/:userId/user", recipeRoutes);
