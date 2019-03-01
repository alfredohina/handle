const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const containerSchema = new Schema({
  name: String,
  lat: Number,
  lng: Number,
  type: {type: String, enum:["organic", "plastic", "glass", "paper"] },
  level: Number,
  notifications: [
    {user: String, date: String}
  ]
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Container = mongoose.model('Containers', containerSchema);
module.exports = Container;