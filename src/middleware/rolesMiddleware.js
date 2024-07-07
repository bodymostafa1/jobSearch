import User from "../../database/models/user.js";

const roleMiddleware = (roles) => {
    return async (req, res, next) => {
        const user = await User.findById(req.id)
      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    };
  };
  
  export default roleMiddleware;
  