import Joi from "joi";
 let signUpSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  recoveryEmail: Joi.string().email(),
  DOB: Joi.date().required(),
  mobileNumber: Joi.string().required(),
  role: Joi.string(),
});

let signInSchema = Joi.object({
  email: Joi.string().email(),
  mobileNumber: Joi.string(),
  password: Joi.string().required(),
});

let updatePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});

let forgetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string().min(6).required(),
});

let updateAccountSchema = Joi.object({
  email: Joi.string().email(),
  mobileNumber: Joi.string(),
  recoveryEmail: Joi.string().email(),
  DOB: Joi.date(),
  lastName: Joi.string(),
  firstName: Joi.string(),
});

let getProfileDataSchema = Joi.object({
  userId: Joi.string().required(),
});

let getAccountsByRecoveryEmailSchema = Joi.object({
  recoveryEmail: Joi.string().email().required(),
});

let addCompanySchema = Joi.object({
  companyName: Joi.string().required(),
  description: Joi.string().required(),
  industry: Joi.string().required(),
  address: Joi.string().required(),
  numberOfEmployees: Joi.string().required(),
  companyEmail: Joi.string().email().required(),
});

let updateCompanySchema = Joi.object({
  companyName: Joi.string(),
  description: Joi.string(),
  industry: Joi.string(),
  address: Joi.string(),
  numberOfEmployees: Joi.string(),
  companyEmail: Joi.string().email(),
});

let getCompanyDataSchema = Joi.object({
  companyId: Joi.string().required(),
});

let searchCompanySchema = Joi.object({
  companyName: Joi.string().required(),
});

let addJobSchema = Joi.object({
  jobTitle: Joi.string().required(),
  jobLocation: Joi.string().required(),
  workingTime: Joi.string().required(),
  seniorityLevel: Joi.string().required(),
  jobDescription: Joi.string().required(),
  technicalSkills: Joi.string().required(),
  softSkills: Joi.string().required(),
});

let updateJobSchema = Joi.object({
  jobTitle: Joi.string(),
  jobLocation: Joi.string(),
  workingTime: Joi.string(),
  seniorityLevel: Joi.string(),
  jobDescription: Joi.string(),
  technicalSkills: Joi.string(),
  softSkills: Joi.string(),
});

let getJobsForCompanySchema = Joi.object({
  companyName: Joi.string().required(),
});

let getJobsWithFiltersSchema = Joi.object({
  workingTime: Joi.string(),
  jobLocation: Joi.string(),
  seniorityLevel: Joi.string(),
  jobTitle: Joi.string(),
  technicalSkills: Joi.string(),
});

let applyToJobSchema = Joi.object({
  jobId: Joi.string().required(),
  userTechSkills: Joi.string().required(),
  userSoftSkills: Joi.string().required(),
});
export {
    signInSchema,
    searchCompanySchema,
    addJobSchema,
    signUpSchema,
    updateJobSchema,
    applyToJobSchema,
    updateAccountSchema,
    updateCompanySchema,
    forgetPasswordSchema,
    getCompanyDataSchema,
    getProfileDataSchema,addCompanySchema,updatePasswordSchema,getJobsForCompanySchema,getJobsWithFiltersSchema,getAccountsByRecoveryEmailSchema
}