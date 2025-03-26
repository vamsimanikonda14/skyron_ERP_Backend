const Document = require('../models/document'); // Import the Document model

// Controller to create a new document
exports.createDocument = async (req, res) => {
    const { name, description, fileUrl } = req.body;

    try {
        // Create a new Document instance
        const newDocument = new Document({
            name,
            description,
            fileUrl,
        });

        // Save the new document to the database
        await newDocument.save();
        res.status(201).json({ success: true, message: 'Document created successfully.', newDocument });
    } catch (error) {
        res.status(500).json({ message: 'Error creating document', error: error.message });
    }
};

// Controller to get all documents
exports.getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.find();
        res.status(200).json({ documents });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching documents', error: error.message });
    }
};

// Controller to get a single document by ID
exports.getDocumentById = async (req, res) => {
    const { id } = req.params;
    try {
        const document = await Document.findById(id);
        if (!document) return res.status(404).json({ message: 'Document not found' });
        res.status(200).json({ document });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching document', error: error.message });
    }
};

// Controller to update a document by ID
exports.updateDocument = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const document = await Document.findById(id);
        if (!document) return res.status(404).json({ message: 'Document not found' });

        // Update the document's fields
        for (const key in updatedData) {
            if (updatedData[key]) document[key] = updatedData[key];
        }

        await document.save();
        res.status(200).json({ success: true, message: 'Document updated successfully.', document });
    } catch (error) {
        res.status(500).json({ message: 'Error updating document', error: error.message });
    }
};

// Controller to delete a document by ID
exports.deleteDocument = async (req, res) => {
    const { id } = req.params;

    try {
        const document = await Document.findById(id);
        if (!document) return res.status(404).json({ message: 'Document not found' });

        // Delete the document from the database
        await document.remove();
        res.status(200).json({ success: true, message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting document', error: error.message });
    }
};
