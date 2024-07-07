import { Router } from 'express';
import { addJob, updateJob, deleteJob, getAllJobs, getJobsForCompany, getJobsWithFilters, applyToJob } from '../job/job.controller.js';
import authMiddleware from '../../middleware/authMiddleware.js';
import roleMiddleware from '../../middleware/rolesMiddleware.js';
import validationMiddleware from '../../middleware/validation.js';
import { addJobSchema, updateJobSchema, getJobsForCompanySchema, getJobsWithFiltersSchema, applyToJobSchema } from '../../utils/joiSchemas.js';
import upload from '../../../config/multer.config.js';

const jobRouter = Router();

jobRouter.post('/job/add/:token', authMiddleware, roleMiddleware(['Company_HR']), validationMiddleware(addJobSchema), addJob);
jobRouter.put('/job/update/:token', authMiddleware, roleMiddleware(['Company_HR']), validationMiddleware(updateJobSchema), updateJob);
jobRouter.delete('/job/delete/:token', authMiddleware, roleMiddleware(['Company_HR']), deleteJob);
jobRouter.get('/job/all/:token', authMiddleware, roleMiddleware(['User', 'Company_HR']), getAllJobs);
jobRouter.get('/job/company/:token', authMiddleware, roleMiddleware(['User', 'Company_HR']), getJobsForCompany);
jobRouter.get('/job/filters/:token', authMiddleware, roleMiddleware(['User', 'Company_HR']), getJobsWithFilters);
jobRouter.post('/job/apply/:token', authMiddleware, roleMiddleware(['User']),upload.single('userResume'), applyToJob);

export default jobRouter;
