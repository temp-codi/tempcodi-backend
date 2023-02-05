import Joi from 'joi';

const create = Joi.object({
    weather: Joi.string().required(),
});

export default { create };
