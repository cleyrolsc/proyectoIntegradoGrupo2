const swaggerJSDoc = require('swagger-jsdoc');
const CustomHeaderFilter = require('./custom-header.filter');

const options = {
    definition: {
      openapi: '3.0.0',
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
              Authorization: {
                  type: "http",
                  scheme: "bearer",
                  bearerFormat: "JWT",
                  value: "Bearer <JWT token here>"
              },
              JWT: {
                  type: "apiKey",
                  name: "token",
                  in: "header"
              }
          }
      },
      
      securityDefinitions: {
        /*AuthToken: {
            type: "apiKey",
            name: "token",
            in: "header",
            description: "The token for authentication"
        },*/
        JWT: {
            type: "apiKey",
            name: "token",
            in: "header"
        }
      },

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
    apis: [`${__dirname}/Controllers/admin/*.js`],
    //operationFilters: [CustomHeaderFilter]
    /*paths: {
    "/admin": {
                parameters: [{ name: "token", in: "header", type: "string", description: "auth token" }]

                }
        }*/
  }

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;