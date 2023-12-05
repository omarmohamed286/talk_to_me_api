const { check } = require("express-validator");
const validatorMW = require("../../middlewares/validatorMW");


exports.createRoomValidator = [
    check('language').notEmpty().withMessage('language is required'),
    check('title').notEmpty().withMessage('title is required'),
    check('languageLevel').notEmpty().withMessage('languageLevel is required'),
    validatorMW
]

exports.deleteRoomValidator = [
    check('id').notEmpty().withMessage('id is required'),
    validatorMW
]
