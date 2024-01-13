import express from "express";
import navbarData from "../data/navbarData.js";

import authenticate from "../middleware/auth.js";
import { actionData, dashboardData } from "../data/dashboardData.js";
import axiosObject from "../utils/axiosObject.js";

const profileUIRouter = express.Router();
profileUIRouter.get("/create", (req, res) => {
  res.render("profile/forms/CreateProfile", { navbar: navbarData });
});
export default profileUIRouter;
