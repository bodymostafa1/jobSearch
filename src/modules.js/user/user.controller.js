import User from '../../../database/models/user.js';
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../../../config/env.js'
export async function updateAccount(req, res) {
  const updates = req.body;
  const userId = req.id;

  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { email, mobileNumber } = updates;

    if (email && email !== user.email) {
      const emailExist = await User.findOne({ email });
      if (emailExist) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    if (mobileNumber && mobileNumber !== user.mobileNumber) {
      const mobileExist = await User.findOne({ mobileNumber });
      if (mobileExist) {
        return res.status(400).json({ message: 'Mobile number already exists' });
      }
    }

    user = await User.findByIdAndUpdate(userId, updates, { new: true });
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export async function deleteAccount(req, res) {
  const userId = req.id;

  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export async function getAccountData(req, res) {
  const userId = req.id;
  try {
    const user = await User.findById(userId).select('-password');
    if (user.status ="online") {
      res.status(200).json(user);
    } else {
      res.json({message:"you are not logged in"})
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export async function getProfileData(req, res) {
  const userId = req.id;

  try {
    const user = await User.findById(userId).select('-password -recoveryEmail -password');
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export async function getAccountsByRecoveryEmail(req, res) {
  const { recoveryEmail } = req.query;

  try {
    const users = await User.find({ recoveryEmail }).select('-password');
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}


export async function signup(req, res) {
  const { firstName, lastName, email, password, recoveryEmail, DOB, mobileNumber,role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      firstName,
      lastName,
      username: `${firstName}${lastName}`,
      email,
      password,
      recoveryEmail,
      DOB,
      mobileNumber,
      role
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

 export async function login (req, res) {
  const { email, mobileNumber, password } = req.body;
  try {
    let user;
    if (email) {
      user = await User.findOne({ email });
    } else {
      user = await User.findOne({ mobileNumber });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    user.status = 'online';
    await user.save();

    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export async function updatePassword (req, res) {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.params.id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Old Password' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export async function forgetPassword (req, res) {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
