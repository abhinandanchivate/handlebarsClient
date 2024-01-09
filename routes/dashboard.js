import express from "express";
import navbarData from "../data/navbarData.js";

const dashboardrouter = express.Router();

dashboardrouter.get("", (req, res) => {
  res.render("dashboard/dashboard", { navbar: navbarData });
});

export default dashboardrouter;
