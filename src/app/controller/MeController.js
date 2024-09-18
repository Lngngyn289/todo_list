const Course = require('../model/Course')
const {multipleMongooseToObject} = require('../../util/mongoose')

class MeController{

  mycourse(req, res, next){
    Course.find({})
      .then(course => res.render('me/stored-courses', {
        course : multipleMongooseToObject(course)
      }))
      .catch(next)
  }

  mytrash(req, res, next){
    Course.findWithDeleted({deleted: true}).lean()
      .then(course => res.render('me/trash-courses', {course}))
      .catch(next)
  }
}

module.exports = new MeController;