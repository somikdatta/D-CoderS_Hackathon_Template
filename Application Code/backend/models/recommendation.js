const mongoose = require('mongoose');

const recommendationSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String },
    filesPath: { type: String, required: true },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdOn: { type: Date },

    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isreviewed: { type: Boolean },
    reviewedOn: { type: Date },

    acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isaccepted: { type: Boolean },
    acceptedOn: { type: Date }

});

module.exports = mongoose.model('Recommendation', recommendationSchema);