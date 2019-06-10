const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    
});

// 회원탈퇴
router.delete('/:userId', (req, res) => {

});

module.exports = router;