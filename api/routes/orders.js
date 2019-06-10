const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const orderModel = require("../models/orders");
const productModel = require("../models/product");

// 데이터 불러오기
router.get('/', (req, res) => {
    res.status(200).json({
        msg: 'order data 데이터 불러옴!!'
    });
});

router.post('/', (req, res) => {
    // res.status(200).json({
    //     msg: 'order data 데이터 생성!!'
    // });

    productModel
        .findById(req.body.productId)
        .then(product => {
            if(!product){
                return res.status(404).json({
                    msg: "Product not found"
                });
            }
            const order = new orderModel({
                _id: mongoose.Types.ObjectId(),
                product: req.body.productId,
                quantity: req.body.quantity
            });
            return order.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                msg: "Order stored",
                createOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders/" + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

router.patch('/', (req, res) => {
    res.status(200).json({
        msg: 'order data 데이터 수정!!'
    });
});

router.delete('/', (req, res) => {
    res.status(200).json({
        msg: 'order data 데이터 삭제!!'
    });
});


module.exports = router;