import { Router } from 'express';
import { addCompany, updateCompany, deleteCompany, getCompanyData, searchCompany, getApplicationsForJobs } from '../company/company.controller.js';
import authMiddleware from '../../middleware/authMiddleware.js';
import roleMiddleware from '../../middleware/rolesMiddleware.js';
import validationMiddleware from '../../middleware/validation.js';
import { addCompanySchema, updateCompanySchema, getCompanyDataSchema, searchCompanySchema } from '../../utils/joiSchemas.js';

const companyRouter = Router();

companyRouter.post('/company/add/:token', authMiddleware, roleMiddleware(['Company_HR']), validationMiddleware(addCompanySchema), addCompany);
companyRouter.put('/company/update/:token', authMiddleware, roleMiddleware(['Company_HR']), validationMiddleware(updateCompanySchema), updateCompany);
companyRouter.delete('/company/delete/:token', authMiddleware, roleMiddleware(['Company_HR']), deleteCompany);
companyRouter.get('/company/data/:token', authMiddleware, roleMiddleware(['Company_HR']), getCompanyData);
companyRouter.get('/company/search/:token', authMiddleware,roleMiddleware(['Company_HR',"user"]), searchCompany);
companyRouter.get('/company/applications/:token', authMiddleware, roleMiddleware(['Company_HR']), getApplicationsForJobs);

export default companyRouter;
