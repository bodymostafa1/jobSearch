import cloudinary from "../../../config/cloudinary.config.js";
import  Application from "../../../database/models/application.js";
import Job from "../../../database/models/job.js";
export async function addJob(req, res) {
  const { jobTitle, jobLocation, workingTime, seniorityLevel, jobDescription, technicalSkills, softSkills } = req.body;
  const addedBy = req.id;

  try {
    const job = new Job({
      jobTitle,
      jobLocation,
      workingTime,
      seniorityLevel,
      jobDescription,
      technicalSkills,
      softSkills,
      addedBy,
    });

    await job.save();
    res.status(201).json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


export async function updateJob (req, res) {
  const updates = req.body;
  const jobId = req.query.jobId;

  try {
    let job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.addedBy.toString() !== req.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    job = await Job.findByIdAndUpdate(jobId, updates, { new: true });
    res.status(200).json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


export async function deleteJob(req, res) {
  const jobId = req.query.jobId;

  try {
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.addedBy.toString() !== req.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Job.findByIdAndDelete(jobId);
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


export async function getAllJobs(req, res) {
  try {
    const jobs = await Job.find().populate('addedBy', '-password');
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


export async function getJobsForCompany(req, res){
  const  companyName  = req.query.companyName;

  try {
    const jobs = await Job.find({ 'company.companyName': new RegExp(companyName, 'i') });
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export async function getJobsWithFilters(req, res) {
  const { workingTime, jobLocation, seniorityLevel, jobTitle, technicalSkills } = req.query;

  const filter = {};
  if (workingTime) filter.workingTime = workingTime;
  if (jobLocation) filter.jobLocation = jobLocation;
  if (seniorityLevel) filter.seniorityLevel = seniorityLevel;
  if (jobTitle) filter.jobTitle = new RegExp(jobTitle, 'i');
  if (technicalSkills) filter.technicalSkills = { $all: technicalSkills.split(',') };

  try {
    const jobs = await Job.find(filter).populate('addedBy', '-password -recoveryEmail');
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export async function applyToJob(req, res){
  const { jobId, userTechSkills, userSoftSkills } = req.body;
  const userId = req.id;

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded or invalid file type. Only PDFs are allowed.' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
    });

    const application = new Application({
      jobId,
      userId,
      userTechSkills,
      userSoftSkills,
      userResume: result.secure_url,
    });

    await application.save();
    res.status(201).json(application);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
