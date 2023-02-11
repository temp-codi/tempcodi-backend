import Joi from 'joi';

const create = Joi.object({
    weather: Joi.string().required(),
    gender: Joi.string().valid('men', 'women').required(),
});

export default { create };
