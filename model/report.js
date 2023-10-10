var mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    alert: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alert',
    },
})