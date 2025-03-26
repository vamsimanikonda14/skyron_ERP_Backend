const express = require('express');
const {
    createDocument,
    getAllDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument
} = require('../controller/documentController');
const router = express.Router();

// POST - Create a new document
router.post('/create', createDocument);

// GET - Get all documents
router.get('/', getAllDocuments);

// GET - Get a single document by ID
router.get('/:id', getDocumentById);

// PUT - Update a document by ID
router.put('/:id', updateDocument);

// DELETE - Delete a document by ID
router.delete('/:id', deleteDocument);

module.exports = router;
