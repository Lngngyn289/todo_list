const Course = require('../model/Course')
const {multipleMongooseToObject} = require('../../util/mongoose')


class CoursesController{
  //[get] /courses/show
  show(req, res, next){
    Course.findOne({slug: req.params.slug}).lean()
      .then(course => 
        res.render('courses/show', {course})
      )
      .catch(next);
  }

  create(req,res,next){
    res.render('courses/create')
  }

  //[post] /courses/store
  store(req, res, next){
    if(req.file) req.body.img = '/uploads/' + req.file.filename
    const course = new Course(req.body)
    course.save()
      .then(() => res.redirect('/me/stored-courses'))
      .catch(next)
  }
  
  //[get] /courses/edit
  edit(req, res, next){
    Course.findById(req.params.id).lean()
      .then(course => res.render('courses/edit', {course}))
      .catch(next)
  }

  //[put] /courses/:id/edit
  update(req, res, next){
    if(req.file) req.body.img = '/uploads/' + req.file.filename
    Course.updateOne({_id: req.params.id}, req.body)
      .then(() => res.redirect('/me/stored-courses'))
      .catch(next)
  }

    //[put] /courses/:id
  delete(req, res, next){
    Course.delete({_id: req.params.id})
      .then(res.redirect('back'))
      .catch(next)
  }

  deleteindb(req,res,next){
    Course.deleteOne({_id: req.params.id})
    .then(res.redirect('back'))
    .catch(next)
  }

    //[patch] /courses/:id/restore
  restore(req,res,next){
    Course.restore({_id: req.params.id})
    .then(res.redirect('back'))
    .catch(next)
  }
  
  actionHandlerFormSubmit(req, res, next){
    switch(req.body.action){
      case 'delete':
        Course.delete({_id: {$in: req.body.allCourseIds}})
          .then(res.redirect('back'))
          .catch(next)
        break;
      default: res.json('error')
    }
  }
}
//https://files.fullstack.edu.vn/f8-prod/courses/13/13.png
//x0fSBAgBrOQ?list=PL_-VfJajZj0UXjlKfBwFX73usByw3Ph9Q
module.exports = new CoursesController;