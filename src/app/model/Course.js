const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');


const Course = new Schema({
  name: {type: String, required: true},
  description: {type: String, maxLength: 1000},
  img: String,
  idvideo: String,
  level: String,
  slug: {type: String, slug: 'name', unique: true},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true
})
mongoose.plugin(slug);

module.exports = mongoose.model('Course', Course);