//DECLARE VARIABLES

const express = require('express');
const app = express();
const PORT = 8500;
const mongoose = require('mongoose');
const TodoTask = require('./models/TodoTask');
require('dotenv').config()

//SET MIDDLEWARE

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

//CONNECT TO MONGO
mongoose.connect(process.env.DB_CONNECTION, 
    {useNewUrlParser: true},
    () => {console.log('Connected to db!')})

//GET METHOD

    app.get('/', async(request, response) => {
        try {
            TodoTask.find({}, (err, tasks) => {
                response.render("index.ejs", { todoTasks: tasks });
            });
        } catch (err) {
            if (err) return response.status(500).send(err);
        }
    });


    //POST METHOD

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

    //EDIT OR UPDATE METHOD

    app
    .route("/edit/:id")
    .get((request, response) => {
        const id = request.params.id;
        TodoTask.find({}, (err, tasks) => {
            response.render("edit.ejs", { todoTasks: tasks, idTask: id });
        });
    })
    .post((request, response) => {
        const id = request.params.id;
        TodoTask.findByIdAndUpdate(
            id,
            {
                title: request.body.title,
                content: request.body.content
            },

            err => {
                if (err) return response.status(500).send(err);
                response.redirect("/");
            });
    });

    //DELETE METHOD

    app
    .route("/remove/:id")
    .get((req, res) => {
        const id = req.params.id;
        TodoTask.findByIdAndRemove(id, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    });

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))