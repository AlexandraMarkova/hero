/* eslint-disable no-useless-catch */
const mongoose = require('mongoose')
const { Heroes } = require('../schemas/hero')

const listHeroes = async () => {
  try {
    const data = await Heroes.find({})
    console.log(data)
    return data
  } catch (error) {
    return error
  }
}

const getHeroById = async (id) => {
  try {
    if (mongoose.isValidObjectId(id)) {
      const heroData = await Heroes.findById(id)
      console.log(heroData)
      return heroData
    }
  } catch (error) {
    throw error
  }
}

const removeHero = async (id) => {
  try {
    if (mongoose.isValidObjectId(id)) {
      const heroData = await Heroes.findByIdAndRemove(id)
      return heroData
    }
  } catch (error) {
    throw error
  }
}

const addHero = async (body) => {
  try {
    const heroData = new Heroes({ ...body })
    await heroData.save()
    return heroData
  } catch (error) {
    throw error
  }
}

const updateHero = async (id, body) => {
  try {
    if (mongoose.isValidObjectId(id)) {
      const heroData = await Heroes.findByIdAndUpdate(
        id,
        {
          $set: { ...body },
        },
        { new: true },
      )
      return heroData
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  listHeroes,
  getHeroById,
  removeHero,
  addHero,
  updateHero,
}
