var mongoose = require('mongoose');

const TreesSchema = mongoose.Schema({
    Plot_Front:{
        type : Number,
        required :true
    },
    Trees: {
        type: Number,
        float: true,
        required: true,
    },
});

const Trees = mongoose.model('Tree', TreesSchema , 'Trees');

module.exports = Trees;


