const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  mail: String,
  type: { type: String, enum: ["admin", "citizen"] },
  disctrit: String,
  image: {type: String, default: 'https://res.cloudinary.com/drlexgkiu/image/upload/v1552048953/handle-city/avatar.png'},
  gender: { type: String, enum: ["male", "female"] },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
