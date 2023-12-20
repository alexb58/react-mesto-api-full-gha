const { celebrate, Joi } = require('celebrate');
const { urlRegexPattern } = require('../../utils/constants');

const cardDataValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().urlRegexPattern(urlRegexPattern),
  }),
});

const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  cardDataValidator,
  cardIdValidator,
};
