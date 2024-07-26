const express = require('express');

const authController = require('./auth.controller');

const authRouter = express.Router();

/**
* @openapi
* '/api/auth/login':
*  post:
*     tags:
*     - Auth Controller
*     summary: Get login token
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - username
*              - password
*            properties:
*              username:
*                type: string
*                default: johndoe
*              password:
*                type: string
*                default: johnDoe20!@
*     responses:
*      200:
*        description: Ok
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                statusCode:
*                  type: integer
*                  example: 200
*                path:
*                  type: string
*                  description: Url path of request
*                  example: '/login'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: object
*                  description: result of the request
*                  properties:
*                    token:
*                      type: string
*                      description: JWT token for authentication
*                      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZGpzaWNsYWl0IiwicHJpdmlsZWdlIjoiYWRtaW4tbWFuYWdlciIsImlhdCI6MTcyMTk0ODYzOCwiZXhwIjoxNzIxOTgxMDM4fQ.tVyT5879tDm2-x1T-3gOjdlhQlg5AKjgjHALwZe8-pI'
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
*                  example: '/login'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: string
*                  description: error message
*                  example: 'this is an example error message'
*      404:
*        description: Not Found
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                statusCode:
*                  type: integer
*                  example: 404
*                path:
*                  type: string
*                  description: Url path of request
*                  example: '/login'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: string
*                  description: error message
*                  example: 'this is an example error message'
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
*                  example: '/login'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: string
*                  description: error message
*                  example: 'this is an example error message'
*/
authRouter.post('/login', authController.loginAsync);

module.exports = authRouter;