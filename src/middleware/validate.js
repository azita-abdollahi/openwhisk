const _validationOptions = {
    abortEarly: false,  
    allowUnknown: true, 
    stripUnknown: true  
};
const ApiError = require('../utils/appError/index');

function validate(schema, params) {
    const { error } = schema.validate(params, _validationOptions);
    if (error) {
        throw new ApiError({status: "error", statusCode: 400 ,success: false , message: error.details[0].message});

    }
}

module.exports = validate;