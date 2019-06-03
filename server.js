const http = require('http');
const express = require('express');
const app = express();

// app.use((req, res) => {
//     res.status(200).json({
//         message: 'It'
//     });
// });

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');


app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);



const PORT = 3000;

const server = http.createServer(app);

server.listen(PORT, console.log('serverstarted'));