const multer = require("multer");

const storage = multer.diskStorage({

    destination: function(req, file, cb) {
        cb(null, "uploads/");

    },

    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
    }

});

function fileFilter(req, file, cb) {

    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG and PNG images are allowed"));
    }

}

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: 5 * 1024 * 1024

    }

});

module.exports = upload;