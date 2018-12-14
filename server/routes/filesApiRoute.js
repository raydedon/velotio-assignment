const express = require('express');
const filesApiRouter = express.Router();
// get Files model
const File = require('../controller/file.controller');

/* GET all files. */
filesApiRouter.get('/', File.findAll);

/* GET files by name. */
filesApiRouter.get('/:name', File.readAll);

filesApiRouter.post('/', File.create);

// Exports all the routes to router variable
module.exports = filesApiRouter;
