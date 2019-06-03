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
router.patch('/:productId', (req, res) => {
    
    const id = req.params.productId;
    const updateOps = {};

    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    productModel
        .update({_id: id}, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    // res.status(200).json({
    //     msg: '데이터 수정 성공!!'
    // });
});

// 데이터 삭제
router.delete('/:productId', (req,res) => {

    const id = req.params.productId;
    productModel
        .remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    // res.status(200).json({
    //     msg: '데이터 삭제 성공!!'
    // });
});

// 상세데이터 불러오기
router.get('/:productId', (req,res) => {

    const id = req.params.productId;
    productModel
        .findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    msg: "관련 제품이 없음"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



module.exports = router;


