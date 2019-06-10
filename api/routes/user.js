const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../models/users");


// 회원가입
router.post('/signup', (req, res) => {

    userModel.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    msg: "Mail exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new userModel({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });

                        user
                            .save()
                            .then(result => {
                                res.status(200).json({
                                    msg: "user created",
                                    userinfo: result
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }         
        })
    
});

// 로그인
router.post('/login', (req, res) => {

    userModel
        .find({ email: req.body.email })
        .exec()
        .then(user => {
            if(user.length < 1) {
                return res.status(401).json({
                    msg: "Not userinfo"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err) {
                    return res.status(400).json({
                        msg: "password not match"
                    });
                }
                if(result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    "secret", { expiresIn: "1h" }
                    );
                    return res.status(200).json({
                        msg: "Auth sucessful",
                        token: token
                    });
                }
                res.status(401).json({
                    msg: "Auth failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    
});

// 회원탈퇴
router.delete('/:userId', (req, res) => {
    
    const id = req.params.userId;
    userModel
        .remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                msg: "delete successful!!"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

module.exports = router;