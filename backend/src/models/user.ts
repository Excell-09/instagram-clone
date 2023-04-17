import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please Provide username'],
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
  },
});

export default mongoose.model('Users', UserSchema);
