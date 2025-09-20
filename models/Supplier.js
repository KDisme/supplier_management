const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
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
    address: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Supplier', supplierSchema);