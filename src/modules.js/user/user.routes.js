import { deleteAccount, forgetPassword, getAccountData, getAccountsByRecoveryEmail, getProfileData, login, signup, updateAccount, updatePassword } from './user.controller.js';
import  validationMiddleware from '../../middleware/validation.js';
import { forgetPasswordSchema, getAccountsByRecoveryEmailSchema, getProfileDataSchema, signInSchema, signUpSchema, updateAccountSchema, updatePasswordSchema } from '../../utils/joiSchemas.js';
import { Router } from 'express';
import authMiddleware from '../../middleware/authMiddleware.js';
const userRouter = Router();
userRouter.post('/user/signup', validationMiddleware(signUpSchema), signup);
userRouter.post('/user/login', validationMiddleware(signInSchema), login);
userRouter.put('/user/updatePassword/:id', validationMiddleware(updatePasswordSchema), updatePassword);
userRouter.put('/user/forgetPassword/:id', validationMiddleware(forgetPasswordSchema), forgetPassword);
userRouter.put('/user/update/:token', authMiddleware, validationMiddleware(updateAccountSchema), updateAccount);
userRouter.delete('/user/delete/:token', authMiddleware, deleteAccount);
userRouter.get('/user/account/:token', authMiddleware, getAccountData);
userRouter.get('/user/profile/:token', authMiddleware,  getProfileData);
userRouter.get('/user/recoveryEmail', getAccountsByRecoveryEmail);
export default userRouter
