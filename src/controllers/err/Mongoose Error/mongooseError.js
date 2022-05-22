const {
   productionErrorResponse,
} = require('../../../../utils/helperFunctions');

function mongooseCastError(err, res) {
   const message = `invalid ${err.path} :${err.value}`;
   productionErrorResponse(err, res, 400, message);
}

function mongooseDuplicateError(err, res) {
   const value = Object.entries(err.keyValue);
   const message = `Duplicate field value : ${value}. Please use another value`;
   productionErrorResponse(err, res, 400, message);
}

function mongooseValidationError(err, res) {
   const errors = Object.values(err.errors).map((el) => el.message);
   const message = `invalid input data kindly provide ${errors}`;
   productionErrorResponse(err, res, 400, message);
}

module.exports = {
   mongooseCastError,
   mongooseDuplicateError,
   mongooseValidationError,
};
