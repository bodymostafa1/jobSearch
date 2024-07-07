import jwt from "jsonwebtoken"
import config from 'config';
const secret = config.get('jwtSecret');

export function generateToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1h' });
}

export function verifyToken(token) {
  return jwt.verify(token, secret);
}
