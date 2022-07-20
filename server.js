//Declare Variables

const express = require('express');
const app = express();
const PORT = 8500;
const mongoose = require('mongoose');
const TodoTask = require('./models/TodoTask');
require('dotenv').config()

//Set Middleware

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

//Connect to Mongo
mongoose.connect(process.env.DB_CONNECTION, 
    {useNewUrlParser: true},
    () => {console.log('Connected to db!')})

//GET Method

    app.get('/', async(request, response) => {
        try {
            TodoTask.find({}, (err, tasks) => {
                response.render("index.ejs", { todoTasks: tasks });
            });
        } catch (err) {
            if (err) return response.status(500).send(err);
        }
    });


    //POST Method

    app.post('/', async(request, response) => {
        
        const todoTask = new TodoTask(
            {
                title: request.body.title,
                content: request.body.content
            }
        );
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