const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const path = require("path")
const storage = new CloudinaryStorage({

    cloudinary,

    params: {

        folder: "expense_receipts",

        allowed_formats: ["jpg", "jpeg", "png"],

        public_id: (req, file) => {

             return Date.now() + "-" + path.parse(file.originalname).name.replace(/\s+/g, "_");

        }

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