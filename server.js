//Declare Variables

const express = require('express');
const app = express();
const PORT = 8500;
const mongoose = require('mongoose');
require('dotenv').config()
//add model variable

//Set Middleware

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));


mongoose.connect()

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))