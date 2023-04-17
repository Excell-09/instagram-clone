import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  postImage: {
    type: String,
    required: [true, 'Please Provide PostImage'],
  },
  caption: {
    type: String,
    required: [true, 'Please Provide caption'],
    minLength: 3,
    maxLength: 150,
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
});

export default mongoose.model('Posts', PostSchema);
