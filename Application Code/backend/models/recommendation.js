const mongoose = require('mongoose');

const recommendationSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String },
    filesPath: { type: Array, required: true },
    department: { type: Number, required: true },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdOn: { type: Date },

    review: { type: String },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isreviewed: { type: Boolean },
    reviewedOn: { type: Date },

    acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isaccepted: { type: Boolean },
    acceptedOn: { type: Date },

    rejectedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isrejected: { type: Boolean },
    rejectedOn: { type: Date },

    isassigned: { type: Boolean },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

});

module.exports = mongoose.model('Recommendation', recommendationSchema);