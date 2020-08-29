const express = require('express')
const router = express.Router();
const expressJoi = require('express-joi-validator');
const schemas = require('../config/schemas');
const imagenes = require('../controllers/imagenes');
const { checkImgToken } =  require('../middlewares/auth');

router.get('/api/v1/getImage', checkImgToken, expressJoi(schemas.img), (req, res) => {
    imagenes.getImage(res, req.query);
});

module.exports = router;