const express = require('express');
const owners = require('../controllers/owners.js');

const router = express.Router();

router.get('/', owners.fetchAll);

router.get('/:id', owners.fetchById);

router.post('/', owners.create);

router.delete('/:id', owners.deleteById);

router.put('/:id', owners.updateById);

module.exports = router;