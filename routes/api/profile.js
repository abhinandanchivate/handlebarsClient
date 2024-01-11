import { createProfile } from "../../controllers/profileController.js";
import { authenticateUser } from "../../controllers/users.js";
import authenticate from "../../middleware/auth.js";
import ProfileModel from "../../models/ProfileModel.js";

import express from "express";

const profileRouter = express.Router();

profileRouter.post("", authenticate, createProfile);
export default profileRouter;
