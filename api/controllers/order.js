const mongoose = require("mongoose");
const orderModel = require("../models/orders");
const productModel = require("../models/product");

exports.orders_get_all = (req, res) => {
    // res.status(200).json({
    //     msg: 'order data 데이터 불러옴!!'
    // });

    orderModel
        .find()
        .select("product quantity _id")
        .exec()
        .then(docs => {
            res.status(200).json({

                count: docs.length,
                order: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/orders/" + doc._id
                        }
                    };
                })

            });
           
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

};

exports.orders_create_order = (req, res) => {
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

};

exports.oreders_delete = (req, res) => {
    // res.status(200).json({
    //     msg: 'order data 데이터 삭제!!'
    // });
    const id = req.params.orderId;
    orderModel
        .remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                msg: "success delete",
                reqeust: {
                    type: "POST",
                    url: "http://localhost:3000/orders",
                    body: {productId: String, quantity: Number}
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.orders_get_order =  (req, res) => {

    const id = req.params.orderId;
    orderModel
        .findById(id)
        .exec()
        .then(order => {
            if(!order) {
                return res.status(404).json({
                    msg: "Order not found"
                });
            }
            res.status(200).json({
                order: order,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders"
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

};

exports.orders_update_order = (req, res) => {
    res.status(200).json({
        msg: 'order data 데이터 수정!!'
    });
};