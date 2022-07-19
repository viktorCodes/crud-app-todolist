//Declare Variables

const express = require('express');
const app = express();
const PORT = 8500;
const mongoose = require('mongoose');
require('dotenv').config()
const TodoTask = require('./models/todotask')

//Set Middleware

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));


mongoose.connect(process.env.DB_CONNECTION, 
    {useNewUrlParser: true},
    () => {console.log('Connected to db!')})



    app.get('/', async(request, response) => {
        try{
            TodoTask.find({}, (err, tasks) => {
                res.render('index.ejs', {todoTaks: tasks})
            })
        }catch (err) {
            if (err) returnres.status(500).send(err)
        }
    })

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))