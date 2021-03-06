const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); //cors middleware
app.use(express.json()) //allows us to parse json

const uri = process.env.ATLAS_URI; //database uri, get from mongoDB Atlas dashboard. ATLAS_URI is an environment variable set in .env
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
); //start database connection. The stuff in the obj needs to be included to deal with MongoDB stuffs. Too complex to understand rn, just include.
const connection = mongoose.connection; //check if connection was successful
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const exercisesRouter = require('./routes/exercises'); //requiring file from router folder for API
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter); //get the app to use the route /exercises and every time that url is requested, server replies with exercisesRouter
app.use('/users', usersRouter); // replies to users url with usersRouter

app.listen(port, () => { //starts the server and listen on the port
    console.log(`Server is running on port: ${port}`);
}) 