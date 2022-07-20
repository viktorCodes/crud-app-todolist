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

//GET Method

    app.get('/', async(request, response) => {
        try{
            
                response.render('index.ejs', {todoTaks: tasks})
        
        }catch (error) {
            response.status(500).send({message: error.message})
        }
    })


    //POST Method

    app.post('/', async(request, response) => {
        
        const todoTask = new TodoTask(
            {
                title: request.body.title,
                content: request.body.content
            }
        )
        try{
            await todoTask.save()
            console.log(todoTask)
            response.redirect('/')
        }catch (err){
            if (err) return response.status(500).send(err)
            response.redirect('/')

        }
    })


app.listen(PORT, () => console.log(`Server is running on ${PORT}`))