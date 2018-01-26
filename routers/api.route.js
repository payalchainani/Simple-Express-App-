const express = require('express');
const petsRouter = require('./pets.route');
const ownersRouter = require('./owners.route');

const router = express.Router();

router.use('/pets', petsRouter);

router.use('/owners', ownersRouter);

module.exports = router;