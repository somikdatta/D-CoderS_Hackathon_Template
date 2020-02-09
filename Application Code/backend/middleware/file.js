const multer = require('multer');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'application/pdf': 'pdf'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid MIME type");
        if (isValid) {
            error = null;
        }
        cb(error, "files");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_').split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

module.exports = multer({ storage: storage }).array("image", 4);

// const upload = multer({
//     storage: multer.memoryStorage(),

//     fileFilter(req, files, callback) {
//         const ext = path.extname(files.originalname);
//         const allowed = ['.png', '.jpg', '.jpeg', '.pdf'];
//         if (allowed.includes(ext)) {
//             callback(null, true);
//         } else {
//             callback(null, false); // handle error in middleware, not here
//         }
//     },
//     limits: {
//         fileSize: 5242880,
//     }

// }).fields([{ name: 'main image', maxCount: 1 }, { name: 'info packs', maxCount: 1 }]);