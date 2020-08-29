const express = require('express')
const expressJoi = require('express-joi-validator');

const router = express.Router();
const schemas = require('../config/schemas');
const login = require('../controllers/login');

router.post('/api/v1/login', expressJoi(schemas.login), (req, res, next) => {
    login.loginUser(res, req.body, next);
});

router.post('/api/v1/loginGoogle', (req, res, next) => {
    login.loginGoogleUser(res, req.body, next);
});

module.exports = router;