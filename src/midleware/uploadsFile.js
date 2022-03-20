//-- import packege
const multer = require('multer')

//exports

exports.uploadsImage = (imageFile) => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads")
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ''))
        }
    })

    //-- filter type file by images
    const filterFile = function (req, file, cb) {
        if (file.fieldname === imageFile) {
            if (!file.originalname.macth(/\.(jpg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
                req.fileValidationError = {
                    message: 'only images file formats allowed'
                }
                return cb(new Error("only images file formats allowed"), false)
            }
        }
        cb(null, true)
    }

    const maxSize = 1 * 1024 * 1000

    const upload = multer({
        storage,
        filterFile,
        limits: {
            fileSize: maxSize
        }
    }).single(imageFile)

    return (req, res, next) => {
        upload(req, res, function (err) {
            if (req.fileValidationError)
                return res.status(400).json({
                    message: fileValidationError
                })
            if (!req.file && !err)
                return res.status(400).json({
                    message: "please select files upload"
                })

            if (err) {
                if (err.code === "LIMIT_FILE_SIZE")
                    return res.status(400).json({
                        message: 'max file size 1 MB'
                    })
                return res.status(400).json({
                    err
                })
            }

            return next()

        })

    }
}