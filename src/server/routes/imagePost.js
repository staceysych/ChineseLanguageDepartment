const express = require('express');

const router = express.Router();

const config = require('config');
const jwt = require('jsonwebtoken');
const verifyToken = require('../utils/verifyToken');

const { secretAccessKey, accessKeyId, region } = config;
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');

aws.config.update({
  secretAccessKey,
  accessKeyId,
  region,
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: 'chinesedepartment',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          '-' +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
});

const single = upload.single('image');

router.post('/upload', verifyToken, (req, res) => {
  jwt.verify(req.token, config.get('jwtSecret'), async (err) => {
    if (err) {
      console.log(req.token);
      res
        .status(403)
        .json({ message: 'Forbidden: попробуйте перезайти в систему' });
    } else {
      single(req, res, (err) => {
        if (err) {
          return res.status(422).send({
            errors: [{ title: 'File Upload Error', detail: err.message }],
          });
        }
        console.log(req.file.location);
        res.status(200).json(req.file.location);
      });
    }
  });
});

router.delete('/delete/:name', verifyToken, (req, res) => {
  jwt.verify(req.token, config.get('jwtSecret'), async (err) => {
    if (err) {
      console.log(req.token);
      res
        .status(403)
        .json({ message: 'Forbidden: попробуйте перезайти в систему' });
    } else {
      console.log(req.params);
      await s3
        .deleteObject({
          Key: req.params.name,
          Bucket: 'chinesedepartment',
        })
        .promise();
      return res.status(288).send('gi');
    }
  });
});

module.exports = router;
