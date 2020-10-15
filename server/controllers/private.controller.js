const Private = require('../models/Private');

exports.PrivateController = {
    findPrivateById: id => {
        return Private.findById(id);
    }
}