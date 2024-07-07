import Application from "../../../database/models/application.js";
import Company from "../../../database/models/company.js";
import Job from "../../../database/models/job.js";
export async function addCompany(req, res){
  const { companyName, description, industry, address, numberOfEmployees, companyEmail } = req.body;
  const companyHR = req.id;

  try {
    let company = await Company.findOne({ companyEmail });
    if (company) {
      return res.status(400).json({ message: 'Company already exists' });
    }

    company = new Company({
      companyName,
      description,
      industry,
      address,
      numberOfEmployees,
      companyEmail,
      companyHR,
    });

    await company.save();
    res.status(201).json(company);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export async function updateCompany(req, res) {
  const updates = req.body;
  const companyId = req.query.companyId;

  try {
    let company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    if (company.companyHR.toString() !== req.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    company = await Company.findByIdAndUpdate(companyId, updates, { new: true });
    res.status(200).json(company);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export async function deleteCompany(req, res) {
  const companyId = req.query.companyId;

  try {
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    if (company.companyHR.toString() !== req.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Job.deleteMany({ addedBy: company.companyHR });
    await Company.findByIdAndDelete(companyId);

    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export async function getCompanyData  (req, res) {
  const companyId = req.query.companyId;

  try {
    const company = await Company.findById(companyId).populate('companyHR', '-password');
    const jobs = await Job.find({ addedBy: company.companyHR });

    res.status(200).json({ company, jobs });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export async function searchCompany (req, res) {
  const { companyName } = req.query;

  try {
    const companies = await Company.find({ companyName: new RegExp(companyName, 'i') });
    res.status(200).json(companies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export async function getApplicationsForJobs (req, res){
  const companyId = req.query.companyId;

  try {
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    if (company.companyHR.toString() !== req.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const jobs = await Job.find({ addedBy: company.companyHR });
    const applications = await Promise.all(
      jobs.map(async (job) => {
        return await Application.find({ jobId: job._id }).populate('userId', '-password');
      })
    );

    res.status(200).json(applications.flat());
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
