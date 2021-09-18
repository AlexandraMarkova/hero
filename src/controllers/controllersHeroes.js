const { HttpCode } = require('../helpers/constants')

const {
  listHeroes,
  getHeroById,
  removeHero,
  addHero,
  updateHero,
} = require('../services/heroService')

const getAll = async (req, res, next) => {
  try {
    const heroes = await listHeroes()
    console.log(heroes)
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { heroes },
    })
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const id = req.params.heroId
    const heroById = await getHeroById(id)
    if (heroById) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { heroById },
      })
    } else {
      res.status(HttpCode.NOT_FOUND).json({
        status: HttpCode.NOT_FOUND,
        massage: 'Not Found Hero',
        data: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const {
      nickName,
      realName,
      originDescription,
      superPowers,
      catchPhrase,
    } = req.body

    if (
      nickName &&
      realName &&
      originDescription &&
      superPowers &&
      catchPhrase
    ) {
      const heroData = await addHero(req.body)
      res.status(HttpCode.CREATED).json({
        status: 'success',
        code: HttpCode.CREATED,
        data: { heroData },
      })
    } else {
      res.status(HttpCode.BAD_REQUEST).json({
        status: HttpCode.BAD_REQUEST,
        massage: 'missing required name field',
      })
    }
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const id = req.params.heroId
    const heroById = await removeHero(id)
    if (heroById) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        massage: 'hero deleted',
        code: HttpCode.OK,
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        massage: 'Not Found hero',
        data: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const hero = await updateHero(req.params.heroId, req.body)
    if (hero) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { hero },
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        massage: 'missing fields',
        data: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
}

const patchPost = async (req, res, next) => {
  try {
    const hero = await updateHero(req.params.heroId, req.body)
    if (hero) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { hero },
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        data: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  patchPost,
}
