const express = require('express')
const router = express.Router();
const expressJoi = require('express-joi-validator');

const schemas = require('../config/schemas');
const producto = require('../controllers/producto');
const { checkToken } =  require('../middlewares/auth');
 
router.get('/api/v1/getAll', checkToken, (req, res, next) => {
    producto.getAllProducts(res, req, next);
});

router.get('/api/v1/getById', checkToken, expressJoi(schemas.getById), (req, res, next) => {
    producto.getById(res, req.query, next);
});

router.get('/api/v1/searchProduct', checkToken, expressJoi(schemas.searchProduct), (req, res, next) => {
    producto.findProducts(res, req.query, next);
});

router.post('/api/v1/createProduct', checkToken, expressJoi(schemas.product), (req, res, next) => {
    producto.createProduct(res, req, next);
});

router.put('/api/v1/updateProduct', checkToken, expressJoi(schemas.product), (req, res, next) => {
    producto.updateProduct(res, req.body, next);
});

router.delete('/api/v1/deleteProduct', checkToken, expressJoi(schemas.getById), (req, res, next) => {
    producto.deleteProduct(res, req.query, next);
});

module.exports = router;