import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Authentication token required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export const adminAuth = (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") return res.status(403).json({ message: "Access denied. Admin only." });
  next();
};
