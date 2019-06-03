const http = require('http');
const express = require('express');
const app = express();

const morgan = require('morgan');

const bodyParser = require("body-parser");

// app.use((req, res) => {
//     res.status(200).json({
//         message: 'It'
//     });
// });

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            msg: error.message
        }
    });
});


const PORT = 3000;

const server = http.createServer(app);

server.listen(PORT, console.log('serverstarted'));