require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const tokenVerification = require("./middleware/tokenVerification");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipes");

//middleware
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`));
const connection = require("./db");
connection();

//Autoryzacja
app.get("/api/users/", tokenVerification);
app.delete("/api/users/", tokenVerification);
app.get("/api/users/info", tokenVerification);
app.post("/api/recipes", tokenVerification);
app.delete("/api/recipes", tokenVerification);
app.get("/api/recipes/:id/user", tokenVerification);

//user
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users/info", userRoutes);
app.use("/api/users/:userId/favorites/:recipeId", userRoutes);

//przepisy
app.use("/api/recipes", recipeRoutes);
app.use("/api/recipes/:id/user", recipeRoutes);
