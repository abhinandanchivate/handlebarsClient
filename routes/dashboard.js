import express from "express";
import navbarData from "../data/navbarData.js";

import authenticate from "../middleware/auth.js";

const dashboardrouter = express.Router();

dashboardrouter.get("", authenticate, (req, res) => {
  console.log(req.user);
  res.render("dashboard/dashboard", { navbar: navbarData });
});

export default dashboardrouter;
