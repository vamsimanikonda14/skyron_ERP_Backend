const mongoose = require('mongoose');

// Create a schema for BOM (Bill of Materials)
const bomSchema = new mongoose.Schema({
    type: { type: String, required: true },                   // Type of the part/item
    name: { type: String, required: true },                   // Name of the part/item
    revision: { type: String, required: true },               // Revision number or identifier
    partNumber: { type: String, required: true, unique: true }, // Unique part number
    description: { type: String, required: true },            // Description of the part/item
    quantityRequired: { type: Number, required: true },      // Quantity required
    stockLevel: { type: Number, required: true },             // Stock level of the part/item
    supplierInfo: { type: String, required: true },           // Supplier details (name, contact, etc.)
    partWeight: { type: String, required: true },             // Weight of the part
    uom: { type: String, required: true },                    // Unit of measure (UOM)
    manufacturingInfo: { type: String, required: true },      // Manufacturing or assembly information
    inventoryLocation: { type: String, required: true },      // Inventory location
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

module.exports = mongoose.model('BOM', bomSchema);
