const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

//connect to cloudinary
cloudinary.config({
  cloud_name: 'di4nqss0b',
  api_key: '587397285485738',
  api_secret: 'MdcOjV7wSr1bU3303zhlsbZu_-c'
});

module.exports.uploadCloudinary = function (req, res, next) {
  if(req.file){
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      let result = await streamUpload(req);
      req.body[req.file.fieldname] = result.secure_url;
      next();
    }

    upload(req);
  }
  else{
    next();
  }
}