import Admin from '../models/Admin.js';

export const adminAuth = async (req, res, next) => {
  const user = req.user;
  const admin = await Admin.findOne({ email: user.email });

  if (!admin) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
