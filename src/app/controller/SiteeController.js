const Course = require('../model/Course');
const {multipleMongooseToObject} = require('../../util/mongoose')
class SiteeController{
  //[get] /news
  async index(req, res,next){
    // try {
    //   const courses = await Course.find({});
    //   res.json(courses);
    // } catch (error) {
    //   res.status(400).json({error:"ERROR"});
    // }
    Course.find({})
      .then(courses => {
        courses = multipleMongooseToObject(courses);
        res.render('home', {courses});
      })
      .catch(next);
  }

  home(req, res){
    res.render('home');
  }
  search(req, res){
    res.render('search');
  }
  
}

module.exports = new SiteeController;

