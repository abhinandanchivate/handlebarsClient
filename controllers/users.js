import navbarData from "../data/navbarData.js";

const getRegisterUser = (req, res) => {
  res.render("auth/register", { navbar: navbarData });
};

const registerUser = (req, res) => {
  console.log(JSON.stringify(req.body));
  console.log("register user post called");
};
export { getRegisterUser, registerUser };
