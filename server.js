const express = require('express');
const server = express();

server.use(express.json());

server.listen(8000, function check(error){
    if (error){
        console.log(error)
    } else {
        console.log('Application is started.')
    }
});

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mgt-sys-db');
        console.log('Database is connected.');
    } catch (error) {
        console.log('Database connection failed:', error);
    }
};
connectDB();