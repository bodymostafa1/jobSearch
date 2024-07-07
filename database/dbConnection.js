import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/", {
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
  }
};

export default connectDB;
