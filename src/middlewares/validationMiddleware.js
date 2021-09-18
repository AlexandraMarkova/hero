const Joi = require('joi')

module.exports = {
  validation: (req, res, next) => {
    const schema = Joi.object({
      nickName: Joi.string().alphanum().min(3).max(30).required(),
      realName: Joi.string().alphanum().min(3).max(30).required(),
      originDescription: Joi.string().alphanum().min(3).max(100).required(),
      superPowers: Joi.string().alphanum().min(3).max(100).required(),
      catchPhrase: Joi.string().alphanum().min(3).max(70).required(),
    })

    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details })
    }

    next()
  },

  patchValidation: (req, res, next) => {
    const schema = Joi.object({
      nickName: Joi.string().alphanum().min(3).max(30).optional(),
      realName: Joi.string().alphanum().min(3).max(30).optional(),
      originDescription: Joi.string().alphanum().min(3).max(100).optional(),
      superPowers: Joi.string().alphanum().min(3).max(100).optional(),
      catchPhrase: Joi.string().alphanum().min(3).max(70).optional(),
    })

    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details })
    }

    next()
  },
}
