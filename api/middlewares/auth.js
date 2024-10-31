import jwt from "jsonwebtoken";

export const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Ensure token is extracted correctly

  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

export default authenticateJWT;
