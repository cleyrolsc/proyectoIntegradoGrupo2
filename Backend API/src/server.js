const express = require("express");
const { urlencoded } = require("express");
const cors = require('cors');

const { globalErrorHandlingFilter } = require("./Core/Filters");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.usersEndpoint = '/api/users';

        this.middlewares();
        this.routes();
        this.filters();
    }

    middlewares(){
        this.app.use(cors());
        app.use(express.json());
        app.use(urlencoded({ extended: true }));
    }

    routes(){
        this.app.use(this.usersEndpoint, require("./Controllers/Users/users.route"));
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