import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  // Extract token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Use the JWT secret from your environment variable
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; // Store the decoded user data in the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
