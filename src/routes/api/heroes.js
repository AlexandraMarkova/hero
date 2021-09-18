/* eslint-disable new-cap */
const express = require('express')
const router = express.Router()

const {
  getAll,
  getById,
  create,
  update,
  remove,
  patchPost,
} = require('../../controllers/controllersHeroes')

const {
  validation,
  patchValidation,
} = require('../../middlewares/validationMiddleware')

router
  .get('/', getAll)
  .get('/:heroId', getById)
  .post('/', validation, create)
  .delete('/:heroId', remove)
  .put('/:heroId', validation, update)
  .patch('/:heroId', patchValidation, patchPost)

module.exports = router
