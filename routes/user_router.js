const express = require("express");
const { deleteUser, updateUser, getUser } = require('../services/user_service')
const validateTokenMW = require('../middlewares/validateTokenMW')


const router = express.Router();

router.get('/', validateTokenMW, getUser)

.delete('/', validateTokenMW, deleteUser)

.patch('/', validateTokenMW, updateUser)



module.exports = router