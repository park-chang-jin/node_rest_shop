const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const orderController = require("../controllers/order");



// 데이터 불러오기
router.get('/', checkAuth, orderController.orders_get_all);


router.post('/', checkAuth, orderController.orders_create_order);

router.patch('/', orderController.orders_update_order);

router.delete('/:orderId', checkAuth, orderController.oreders_delete);

// 상세데이터 불러오기
router.get("/:orderId", checkAuth, orderController.orders_get_order);

module.exports = router;