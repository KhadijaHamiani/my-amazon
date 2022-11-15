import express from 'express'; // node package that provide many features
import mongoose from 'mongoose';
// it's very important to add extention to the file imported
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.MONGODB_URL || 'mongodb://localhost/MY_AMAZON',
  {
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('Connected to MongoDB!!!');
  }
);
////////// we don't need this anymore because we will be connected to db not to data.js
//the 3rd route is for getting product details
/*app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found ' });
  }
});*/

// the second route is for getting products from data.js
/*app.get('/api/products', (req, res) => {
  res.send(data.products);
});*/
///////////////////////////////////////////////////
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/order', orderRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
// first route is just to know that the server is ready
app.get('/', (req, res) => {
  res.send('Server is ready');
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  //error catcher in userRouter
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

// to make server runing
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

// execute this command npm install --save-dev nodemon
//make the runing of server faster and automatic so we don't need
//to stop and reruning it each time we make a change on our code
