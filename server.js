import express from 'express';
import colors from 'colors';   // for this i have define in package json type module for es6 for es5 common js
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));

app.get('/',(req,res)=>{
    // res.send({
    //     "message" : "Welcome to Ecommerce App"
    // })
    res.send("<center><h1>Welcome to Ecommerce App </h1></center>")
})
//react port 3000, angular 4200, node 8080 | 8000
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT,()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} ${process.env.PORT}`.bgCyan.white)
})