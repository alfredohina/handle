const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const reportSchema = new Schema({
  id_user:  {type:Schema.Types.ObjectId, ref:'User'},
  id_container:  {type:Schema.Types.ObjectId, ref:'Container'},
  problem: {type:Boolean, default:false},
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Report = mongoose.model('Review', reportSchema);
module.exports = Report;