const express = require('express');
const { createPromo, getAllPromo, getPromo, updatePromo, deletePromo } = require('../controllers/promoController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta para crear la promo
router.post('/create', createPromo);

// Ruta para obtener todas las promo
router.get('/get-all', authMiddleware, getAllPromo);

// Ruta para obtener una promo por ID
router.get('/get/:id', authMiddleware, getPromo);

// Ruta para actualizar una promo por ID
router.put('/update/:id', authMiddleware, updatePromo);

// Ruta para eliminar una promo por ID
router.delete('/delete/:id', authMiddleware, deletePromo);

module.exports = router;