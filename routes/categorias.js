const express = require('express')
const router = express.Router();
const expressJoi = require('express-joi-validator');

const schemas = require('../config/schemas');
const categorias = require('../controllers/categorias');
const { checkToken, checkAdminRole } =  require('../middlewares/auth');
 
router.get('/api/v1/getAll', checkToken, (req, res, next) => {
    categorias.getAllCategories(res, req, next);
});

router.get('/api/v1/getById', checkToken, expressJoi(schemas.getById), (req, res, next) => {
    categorias.getById(res, req.query, next);
});

router.post('/api/v1/createCategory', checkToken, expressJoi(schemas.category), (req, res, next) => {
    categorias.createCategory(res, req, next);
});

router.put('/api/v1/updateCategory', checkToken, expressJoi(schemas.category), (req, res, next) => {
    categorias.updateCategory(res, req.body, next);
});

router.delete('/api/v1/deleteCategory', checkToken, checkAdminRole, expressJoi(schemas.getById), (req, res, next) => {
    categorias.deleteCategory(res, req.query, next);
});

module.exports = router;