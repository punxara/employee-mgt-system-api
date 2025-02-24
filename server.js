const express = require('express');
const server = express();

const cors = require('cors');
server.use(cors());

server.use(express.json());
server.listen(8000, function check(error){
    if (error){
        console.log(error)
    } else {
        console.log('Application is started.')
    }
});

// --------------------------------------------------MONGOOSE----------------------------------------------------------
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

// --------------------------------------------------ROUTES----------------------------------------------------------
const routes = require('./routes/routes');
server.use(routes);

// --------------------------------------------------SWAGGER----------------------------------------------------------
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Management System API',
            version: '1.0.0',
            description: 'API documentation for the Management System',
        },
        servers: [
            {
                url: 'http://localhost:8000',
            },
        ],
    },
    apis: ['./routes/routes.js'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
