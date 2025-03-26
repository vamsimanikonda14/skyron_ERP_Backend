const BOM = require('../models/bom'); // Import BOM model

// Controller for Creating a BOM entry
exports.createBOM = async (req, res) => {
    const {
        type,
        name,
        revision,
        partNumber,
        description,
        quantityRequired,
        stockLevel,
        supplierInfo,
        partWeight,
        uom,
        manufacturingInfo,
        inventoryLocation,
    } = req.body;

    try {
        // Check if part number already exists
        const existingBOM = await BOM.findOne({ partNumber });
        if (existingBOM) {
            return res.status(400).json({ message: 'Part number already exists.' });
        }

        // Create new BOM entry
        const newBOM = new BOM({
            type,
            name,
            revision,
            partNumber,
            description,
            quantityRequired,
            stockLevel,
            supplierInfo,
            partWeight,
            uom,
            manufacturingInfo,
            inventoryLocation,
        });

        await newBOM.save();
        res.status(201).json({ success: true, message: 'BOM created successfully.', newBOM });
    } catch (error) {
        res.status(500).json({ message: 'Error creating BOM', error: error.message });
    }
};

// Controller for Getting all BOM entries
exports.getAllBOMs = async (req, res) => {
    try {
        const bomData = await BOM.find();
        res.status(200).json({ bomData });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching BOM data', error: error.message });
    }
};

// Controller for Getting a single BOM by ID
exports.getBOMById = async (req, res) => {
    const { id } = req.params;
    try {
        const bom = await BOM.findById(id);
        if (!bom) return res.status(404).json({ message: 'BOM not found' });
        res.status(200).json({ bom });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching BOM', error: error.message });
    }
};

// Controller for Updating a BOM entry by ID
exports.updateBOM = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const bom = await BOM.findById(id);
        if (!bom) return res.status(404).json({ message: 'BOM not found' });

        // Update the BOM data
        for (const key in updatedData) {
            if (updatedData[key]) bom[key] = updatedData[key];
        }

        await bom.save();
        res.status(200).json({ success: true, message: 'BOM updated successfully.', bom });
    } catch (error) {
        res.status(500).json({ message: 'Error updating BOM', error: error.message });
    }
};

// Controller for Deleting a BOM entry by ID
exports.deleteBOM = async (req, res) => {
    const { id } = req.params;
    try {
        const bom = await BOM.findById(id);
        if (!bom) return res.status(404).json({ message: 'BOM not found' });

        await bom.remove();
        res.status(200).json({ success: true, message: 'BOM deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting BOM', error: error.message });
    }
};
