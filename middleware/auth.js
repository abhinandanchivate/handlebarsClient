import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  console.log("hello from middleware");
  const token = req.header("x-auth-token");
  console.log(token);
  // If the token is there or not
  if (!token) {
    return res.status(401).json({ msg: "no token, authorization denied" });
  }
  // verify the token
  try {
    jwt.verify(token, "jwtSecret", (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "token is not valid" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.log("something went wrong with middleware");
    res.status(500).json({ msg: "server error" });
  }
};

export default authenticate;
