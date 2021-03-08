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
  const filetypes = /jpeg|jpg|png|gif|txt|pdf|docs/;
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

const photoFilter = (req, file, cb) => {
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

const uploadPhoto = multer({
  photoFilter,
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

const uploadFile = multer({
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

const uploadsGallery = multer({
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

const single = uploadPhoto.single('image');
const singleFile = uploadFile.single('file');
const many = uploadsGallery.array('images', 4);

router.post('/upload', verifyToken, (req, res) => {
  jwt.verify(req.token, config.get('jwtSecret'), async (err) => {
    if (err) {
      console.log(req.token);
      res
        .status(403)
        .json({ message: 'Время сеанса вышло! Для продолжения войдите заново.' });
    } else {
      single(req, res, (err) => {
        console.log(req.file);
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
        .json({ message: 'Время сеанса вышло! Для продолжения войдите заново.' });
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
router.post('/upload/file', verifyToken, (req, res) => {
  jwt.verify(req.token, config.get('jwtSecret'), async (err) => {
    if (err) {
      console.log(req.token);
      res
        .status(403)
        .json({ message: 'Время сеанса вышло! Для продолжения войдите заново.' });
    } else {
      singleFile(req, res, (err) => {
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

router.delete('/delete/file/:name', verifyToken, (req, res) => {
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

router.post('/multiple-file-upload', verifyToken, (req, res) => {
  jwt.verify(req.token, config.get('jwtSecret'), async (err) => {
    if (err) {
      console.log(req.token);
      res
        .status(403)
        .json({ message: 'Forbidden: попробуйте перезайти в систему' });
    } else {
      many(req, res, (err) => {
        if (err) {
          return res.status(422).send({
            errors: [{ title: 'File Upload Error', detail: err.message }],
          });
        }
        const locations = [];
        req.files.forEach((el) => {
          locations.push(el.location);
        });
        res.status(200).json(locations);
      });
    }
  });
});

module.exports = router;
