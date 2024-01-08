// 1st we need to render the template
// 2nd we need to handle the rest call.
import express from "express";

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("auth/register", {});
});
export default router;
