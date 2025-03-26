const express = require('express');
const {
    createBOM,
    getAllBOMs,
    getBOMById,
    updateBOM,
    deleteBOM
} = require('../controller/bomController');
const router = express.Router();

// POST - Create a BOM entry
router.post('/create', createBOM);

// GET - Get all BOM entries
router.get('/', getAllBOMs);

// GET - Get a single BOM entry by ID
router.get('/:id', getBOMById);

// PUT - Update a BOM entry by ID
router.put('/:id', updateBOM);

// DELETE - Delete a BOM entry by ID
router.delete('/:id', deleteBOM);

module.exports = router;
