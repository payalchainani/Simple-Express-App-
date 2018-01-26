const express = require('express');
const pets = require('../controllers/pets.js');

const router = express.Router();

router.get('/', pets.fetchAll);

router.get('/:id', pets.fetchById);

router.post('/', pets.create);

router.delete('/:id', pets.deleteById);

router.put('/:id', pets.updateById);

module.exports = router;