import express from "express";
import connectDB from "./config/index.js";
import cors from "cors";

//const express = require("express");
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import exphbs from "express-handlebars";
import homeRouter from "./routes/index.js";
import helpers from "./helpers/index.js";
import userRouter from "./routes/api/users.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);
const app = express();
const PORT = 3006;

connectDB();
// to get the req data in terms of json
app.use(express.json());
// cors support
app.use(cors());
// refer teh static contnet
app.use(express.static(join(__dirname, "public")));
// express hbs integration.

// by setting up the engine hbs seettings
app.engine("hbs", exphbs.engine({ extname: ".hbs", helpers }));
app.set("view engine", ".hbs");
app.set("views", join(__dirname, "views"));

// routes

app.use("/", homeRouter);
app.use("/api/users", userRouter);
app.listen(PORT, () => {
  console.log("server started");
  console.log(`Server running on port ${PORT}`);
});
