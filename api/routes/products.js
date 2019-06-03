const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const productModel = require("../models/product");

// 데이타 불러오기
router.get('/', (req, res) => {
    productModel
        .find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    // res.status(200).json({
    //     msg: '데이터 불러옴 성공!!'
    // });
});

// 데이터 생성
router.post('/', (req, res) => {

    const product = new productModel ({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                msg: "data 저장 생성 성공!!",
                createdProduct: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });


    // res.status(200).json({
    //     msg: '데이터 생성 성공!!',
    //     createdProduct: product
    // });
});

// 데이터 수정
router.patch('/', (req, res) => {
    res.status(200).json({
        msg: '데이터 수정 성공!!'
    });
});

router.delete('/', (req,res) => {
    res.status(200).json({
        msg: '데이터 삭제 성공!!'
    });
});


module.exports = router;


