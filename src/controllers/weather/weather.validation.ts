import Joi from 'joi';

const create = Joi.object({
    lon: Joi.string().required(),

    lat: Joi.string().required(),

    city: Joi.string().required(),
});

export default { create };
