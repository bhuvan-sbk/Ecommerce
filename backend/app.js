const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const MONGO_URI=process.env.MONGO_CONNECTION;


const register = require('./Routes/register');
const login = require('./Routes/login');
const logout = require('./Routes/logout');
const verifyToken = require('./Routes/verifyToken');
const populateDatabase = require('./PopulateDB/populateDatabase');
const productDetails = require('./Routes/productDetails');
const cart = require('./Routes/cart');
const bill = require('./Routes/bill');
 const verify  = require('./Routes/verify');
const googleLogin = require('./Routes/googleLogin');



const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/google-login', googleLogin);
app.use('/verify-token', verifyToken);


app.use('/products/all', verifyToken, productDetails);
app.use('/cart', verifyToken, cart);
app.use('/calculate-bill', verifyToken, bill);
 app.use('/verify', verifyToken,verify);



mongoose.set('strictQuery', false);



mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});
    
// Populate the database   
// populateDatabase();



app.listen(process.env.PORT || 8888,()=>{
    console.log(`server is working on port ${process.env.PORT}`);
})