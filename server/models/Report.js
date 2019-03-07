const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const reportSchema = new Schema({
  id_user:  {type:Schema.Types.ObjectId, ref:'User'},
  id_container:  {type:Schema.Types.ObjectId, ref:'Container'},
  type: {type: String, enum:["organic", "plastic", "glass", "paper"] },
  date: Number,
  name: String,
  lat: Number,
  lng: Number,
  gender: { type: String, enum: ["male", "female"] },
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;