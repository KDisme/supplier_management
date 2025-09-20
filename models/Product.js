const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    oid: {
        type: String,
        unique: true,
        default: function() {
            return new mongoose.Types.ObjectId().toString();
        }
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    oid_supplier: {
        type: String,
        required: true,
        ref: 'Supplier'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);