const express = require('express');
const { checkForAdminPrivileges } = require('../../Core/Filters/privilege-checks.filter');

const IncidentController = require('./incidents.controller');

const incidentsRouter = express.Router();
/**
* @openapi
* '/api/incidents/':
*  post:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Incidents Controller
*     summary: User can submit an incident to a supervisor
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - comment
*            properties:
*              comment:
*                type: string
*                default: 'I have a complaint to make'
*     responses:
*      201:
*        description: Created
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                statusCode:
*                  type: integer
*                  example: 201
*                path:
*                  type: string
*                  description: Url path of request
*                  example: '/'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: object
*                  description: result of the request
*                  properties:
*                    id:
*                      type: integer
*                      default: 1
*                    employeeId:
*                      type: integer
*                      description: Id of employee who submitted the incident
*                      default: 3
*                    supervisorId:
*                      type: integer
*                      default: 1
*                    status:
*                      type: integer
*                      default: 0
*                    createAt:
*                      type: date
*                      default: '2024-07-25T23:05:50.161Z'
*      400:
*        description: Bad Request
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                statusCode:
*                  type: integer
*                  example: 400
*                path:
*                  type: string
*                  description: Url path of request
*                  example: '/'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: object
*                  description: error message
*                  properties:
*                    errorType:
*                      type: string
*                      example: 'Error'
*                    message:
*                      type: string
*                      example: 'this is an example error message'
*      401:
*        description: Unauthorized
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                statusCode:
*                  type: integer
*                  example: 401
*                path:
*                  type: string
*                  description: Url path of request
*                  example: '/'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: object
*                  description: error message
*                  properties:
*                    errorType:
*                      type: string
*                      example: 'Error'
*                    message:
*                      type: string
*                      example: 'this is an example error message'
*      500:
*        description: Server Error
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                statusCode:
*                  type: integer
*                  example: 500
*                path:
*                  type: string
*                  description: Url path of request
*                  example: '/'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: object
*                  description: error message
*                  properties:
*                    errorType:
*                      type: string
*                      example: 'Error'
*                    message:
*                      type: string
*                      example: 'this is an example error message'
*/
incidentsRouter.post('/', IncidentController.registerIncidentAsync);

module.exports = incidentsRouter;