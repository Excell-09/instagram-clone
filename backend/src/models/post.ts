import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  postImage: {
    type: String,
    required: [true, 'Please Provide PostImage'],
  },
  caption: {
    type: String,
    required: [true, 'Please Provide caption'],
    minlength: 3,
    maxlength: 150,
  },
  likes: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  comments: [
    {
      username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
      userImage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        minlength: 3,
        maxlength: 2200,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: [true, 'Please provide user'],
  },
});

export default mongoose.model('posts', PostSchema);
