const {
   productionErrorResponse,
} = require('../../../../utils/helperFunctions');

function CastError(err, res) {
   const message = `invalid ${err.path} :${err.value}`;
   productionErrorResponse(err, res, 400, message);
}

function DuplicateError(err, res) {
   const value = Object.entries(err.keyValue);
   const message = `Duplicate ${value}. Please use another value`;
   productionErrorResponse(err, res, 400, message);
}

function ValidationError(err, res) {
   const errors = Object.values(err.errors).map((el) => el.message);
   const message = `invalid input data kindly provide ${errors.join(',')}`;
   productionErrorResponse(err, res, 400, message);
}

module.exports = {
   CastError,
   DuplicateError,
   ValidationError,
};
