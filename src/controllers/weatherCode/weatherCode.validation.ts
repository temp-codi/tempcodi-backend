import Joi from 'joi';

const create = Joi.object({
    code: Joi.number().required(),
});

export default { create };
