//-- import packege
const multer = require('multer')

//exports

exports.uploadsImage = (imageFile) => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/productImg")
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ''))
        }
    })

    //-- filter type file by images
    const fileFilter = function (req, file, cb) {
        if (file.fieldname === imageFile) {
            if (!file.originalname.match(/\.(jpg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
                req.fileVallidationError = 'only images file formats allowed'
                return cb(new Error("only images file formats allowed"), false)
            }
        }
        cb(null, true)
    }

    const maxSize = 1 * 1024 * 1000

    const upload = multer({
        storage,
        fileFilter,
        limits: {
            fileSize: maxSize
        }
    }).single(imageFile)

    return (req, res, next) => {
        upload(req, res, function (err) {
            if (req.fileVallidationError)
                return res.status(400).json({
                    message: req.fileVallidationError
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
                    error: err
                })
            }

            return next()

        })

    }
}