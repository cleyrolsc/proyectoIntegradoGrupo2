const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
      openapi: '3.0.1',
      info: {
        title: 'Mini Blog API',
        description: "API endpoints for a mini blog services documented on swagger",
        contact: {
          name: "Desmond Obisi",
          email: "info@miniblog.com",
          url: "https://github.com/DesmondSanctity/node-js-swagger"
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
      `${__dirname}/Controllers/System/*.js`,
      `${__dirname}/Controllers/Users/*.js`
    ]
  }

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;