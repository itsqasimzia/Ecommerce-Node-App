const multer = require('multer')
const path = require('path')
// multer is a 7-bit encoding standard
// 1mb file size 
const fileSize = 1 * 1000 * 1000
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../assets/images') )
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
       const fileExt = uniqueSuffix + '-' + file.originalname
       req.body.image = fileExt
       cb(null, fileExt)
    }
  })
  function fileFilters (req, file, cb) { 
    const skipFormats = ['pdf','doc','csv']
    const rcvdFileExt =  file.originalname.split('.')[1]
    if (skipFormats.includes(rcvdFileExt)) {
          cb(new Error('File Format Not Supported'))
    }else{
      cb(null, true)
    }
  }
const upload = multer({ storage: storage, limits:{fileSize:fileSize}, fileFilter:fileFilters}).single('fileupload')

module.exports = {  upload }