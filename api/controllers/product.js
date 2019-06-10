const mongoose = require("mongoose");
const productModel = require("../models/product");


exports.products_get_all = (req, res) => {
    productModel
        .find()
        .select('name price _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return{
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/products/" + doc._id
                        }
                    };
                })
            };
            res.status(200).json(response);
            // console.log(docs);
            // res.status(200).json(docs);
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
};

exports.products_create_product = (req, res) => {

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
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/products/" + result._id
                    }
                }
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
};


exports.products_get_product = (req, res) => {

    const id = req.params.productId;
    productModel
        .findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/products"
                    }
                });
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
};


exports.products_delete = (req, res) => {

    const id = req.params.productId;
    productModel
        .remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                msg: "Product deleted",
                request: {
                    type: "POST",
                    url: "http://localhost:3000/products",
                    body: { name: "String", price: "String"}
                    
                }
            });
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
};

exports.products_update_product = (req, res) => {
    
    const id = req.params.productId;
    const updateOps = {};

    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    productModel
        .update({_id: id}, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                mes: "Product updated",
                request: {
                    type: "GET",
                    url: "http://localhost:3000/products/" + id
                }
            });
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
};