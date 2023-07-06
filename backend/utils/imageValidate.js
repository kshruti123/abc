// const path = require('path');
// const multer= require("multer");
// var storage = multer.diskStorage({
//   destination: function(req,file,cb){
//     cb(null,'/backend/uploads/')
//   },
//   filename: function(req,file,cb){
//     let ext = path.extname(file.originalname);
//     cb(null,Date.now()+ext)
//   }
// })
// var upload=multer({
//   storage:storage,
//   fileFilter:function(req,file,callback){
//     if(file.mimetype=="image/png" || file.mimetype=="image/jpg"|| file.mimetype=="image/jpeg"){
//       callback(null,true)
//     }else{
//       console.log('only jpg,png and jpeg file supported');
//       callback(null,false)
//     }
//   },
//   limits:{
//     fileSize:1024*1024*2
//   }
// })
// module.exports=upload;
const imageValidate = (images) => {
  let imagesTable = [];
  if (Array.isArray(images)) {
    imagesTable = images;
  } else {
    imagesTable.push(images);
  }
  if (imagesTable.length > 1) {
    return { error: "Upload only 1 image" };
  }
  for (let image of imagesTable) {
    if (image.size > 1048576) return { error: "Size too large (above 1MB)" };
    const filetypes = /jpg|jpeg|png/;
    const mimetype = filetypes.test(image.mimetype);
    if (!mimetype)
      return { error: "Incorrect mime type (should be jpg,jpeg or png)" };
  }
  return { error: false };
};
module.exports = imageValidate;
