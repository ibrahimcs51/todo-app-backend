import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware to protect routes
export const protect = (req, res, next) => {
  // 1) Get token from Authorization header
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  // 2) If no token, deny access
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided.' });
  }

  try {
    // 3) Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 4) Attach user ID to request object
    req.user = { id: decoded.id };

    // 5) Proceed
    return next();
  } catch (error) {
    console.error('JWT verification error:', error.message);
    return res.status(401).json({ message: 'Not authorized, token invalid or expired.' });
  }
};
