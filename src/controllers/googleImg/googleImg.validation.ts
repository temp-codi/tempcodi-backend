import Joi from 'joi';

const create = Joi.object({
    keyword: Joi.string().required(),

    pageNo: Joi.number().required(),

    gender: Joi.string().valid('male', 'female').required(),
});

export default { create };
