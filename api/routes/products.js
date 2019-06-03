const express = require('express');
const router = express.Router();

// 데이타 불러오기
router.get('/', (req, res) => {
    res.status(200).json({
        msg: '데이터 불러옴 성공!!'
    });
});

// 데이터 생성
router.post('/', (req, res) => {

    const product = {
        name: req.body.name,
        price: req.body.price
    };

    res.status(200).json({
        msg: '데이터 생성 성공!!',
        createdProduct: product
    });
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


