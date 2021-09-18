const mongoose = require('mongoose')
const gravatar = require('gravatar')
const Schema = mongoose.Schema

const heroSchema = new Schema(
  {
    nickName: {
      type: String,
      required: [true, 'Set nickname for hero'],
      unique: true,
    },
    realName: {
      type: String,
      required: [true, 'Set real name for hero'],
      unique: true,
    },
    originDescription: {
      type: String,
    },
    superPowers: {
      type: String,
      required: [true, 'Set power for hero'],
    },
    catchPhrase: {
      type: String,
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250' }, true)
      },
    },
  },
  { versionKey: false, timestamps: true },
)

const Heroes = mongoose.model('heroes', heroSchema)

module.exports = {
  Heroes,
}
