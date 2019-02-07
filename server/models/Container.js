const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const containerSchema = new Schema({
  location: { type: { type: String }, coordinates: [Number] },
  type: {type: String, enum:["organic", "plastic", "glass", "paper"] },
  level: Number,
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Container = mongoose.model('Review', containerSchema);
module.exports = Container;