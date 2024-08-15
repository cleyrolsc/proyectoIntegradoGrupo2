require('dotenv').config()
const express = require("express");
const cors = require('cors');
const { urlencoded } = require("express");
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const { adminRouter, usersRouter, authRouter, systemRouter, schedulesRouter } = require("./Controllers");
//const testConnection = require('./Database/db-config');
const { globalErrorHandlingFilter, sessionAuthenticationFilter } = require("./Core/Filters");

class Server {
    constructor() {
        this.app = express();
        this.port = +process.env.PORT || 3000;

        this.adminEndpoint = '/api/admin';
        this.authEndpoint = '/api/auth';
        this.systemEndpoint = '/api/system';
        this.usersEndpoint = '/api/users';
        this.scheduleEndpoint = '/api/schedules'

        this.middlewares();
        this.routes();
        this.filters();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(urlencoded({ extended: true }));

        const corsOptions = {
            origin: 'http://127.0.0.1:5500',  // Replace with your frontend URL
            optionsSuccessStatus: 200  // Some legacy browsers (IE11, various SmartTVs) choke on 204
        };
        this.app.use(cors(corsOptions));
      
        this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    }

    routes(){
        // Public endpoints
        this.app.use(this.authEndpoint, authRouter);

        this.app.use(sessionAuthenticationFilter);
        // Authenticated endpoints
        this.app.use(this.adminEndpoint, adminRouter);
        this.app.use(this.systemEndpoint, systemRouter);
        this.app.use(this.usersEndpoint, usersRouter);
        this.app.use(this.scheduleEndpoint, schedulesRouter)
    }

    filters(){
        this.app.use(globalErrorHandlingFilter);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server Started. Port: ${this.port}`);
        });
    }
}

module.exports = Server;