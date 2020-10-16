const express = require('express');
const path = require('path');
const morgan = require('morgan');
const hbs =require('hbs');
const cookieParser= require('cookie-parser');
require('./db/mongoose');
const userRouter= require('./routes/user');
const taskRouter= require('./routes/task');

const app = express();
app.use(express.json());
app.use(cookieParser());

//setting up paths for static contains and view files
const publicDirectoryPath = path.join(__dirname,'/public');
const viewDirectoryPath = path.join(__dirname,'../views/templates');
const partialDirectoryPath = path.join(__dirname,'../views/partials');

//view engine setup
app.set('view engine', 'hbs');
app.set('views',viewDirectoryPath);
hbs.registerPartials(partialDirectoryPath);

//setup statics directories to serve
app.use(express.static(publicDirectoryPath));

app.use(morgan('dev'));
app.use(userRouter);
app.use(taskRouter);


const PORT = process.env.PORT || 9000;

//app listen to the port
app.listen(PORT, (req, res) => {
    console.log("The app is running on PORT "+ PORT);
})
