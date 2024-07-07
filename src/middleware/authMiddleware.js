import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/env.js';
import User from '../../database/models/user.js';

const authMiddleware = async (req, res, next) => {
  const token = req.params.token;
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.id = decoded.id
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
export default authMiddleware;
