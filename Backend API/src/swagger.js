const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'Backend API',
      description: "API endpoints to manage call center operations",
      contact: {
        name: "Proyecto Integrado Grupo 2",
        email: "",
        url: "https://github.com/cleyrolsc/proyectoIntegradoGrupo2"
      },
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      bearerAuth: []
    }],
    servers: [
      {
        url: "http://localhost:3000/",
        description: "Local server"
      },
      {
        url: "<your live url here>",
        description: "Live server"
      },
    ]
  },
  // looks for configuration in specified directories
  apis: [
    `${__dirname}/Controllers/Admin/*.js`,
    `${__dirname}/Controllers/Auth/*.js`,
    `${__dirname}/Controllers/Payrolls/*.js`,
    `${__dirname}/Controllers/Schedules/*.js`,
    `${__dirname}/Controllers/System/*.js`,
    `${__dirname}/Controllers/Users/*.js`,
  ]
}

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;