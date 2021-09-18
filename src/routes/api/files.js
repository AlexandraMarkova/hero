const express = require('express')
const multer = require('multer')
const path = require('path')

const UPLOAD_DIR = path.resolve('./tmp')

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const { avatarsController } = require('../../controllers/controllersFiles')

const uploadMiddleware = multer({
  storage: storage,
  limits: { fileSize: 1048576 },
})

router
  // .post('/avatars', uploadMiddleware.single('avatar'), uploadController)
  // .use('/avatars', express.static(IMG_DIR))
  .patch(
    '/:heroId/avatars',
    uploadMiddleware.single('avatar'),
    avatarsController,
  )

module.exports = router
