const Private = require('../models/Private');

exports.PrivateController = {
    findPrivateById: id => {
        return Private.findById(id);
    },
    populate: async (private, ...relations) => {
        return Private.populate(private, relations)
    }
}