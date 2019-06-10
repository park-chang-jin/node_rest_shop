const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");


const productController = require("../controllers/product");



// 데이타 불러오기
router.get('/', productController.products_get_all);

// 데이터 생성
router.post('/', checkAuth, productController.products_create_product);

// 데이터 수정
router.patch('/:productId', checkAuth, productController.products_update_product);

// 데이터 삭제
router.delete('/:productId', checkAuth, productController.products_delete);

// 상세데이터 불러오기
router.get('/:productId', checkAuth, productController.products_get_product);



module.exports = router;


