import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  recoveryEmail: { type: String },
  DOB: { type: Date, required: true },
  mobileNumber: { type: String, required: true, unique: true },
  role: { type: String, enum: ['User', 'Company_HR'], default: 'User' },
  status: { type: String, enum: ['online', 'offline'], default: 'offline' },
});
const User = mongoose.model('User', userSchema)
export default User;
