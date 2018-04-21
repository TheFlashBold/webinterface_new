const mongoose = require('mongoose');

mongoose.connect(`mongodb://${global.config.database.host}/${global.config.database.collection}`);

mongoose.model('user', mongoose.Schema({
    email: {
        type: String
    },
    name: {
        type: String
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    session: {
        type: String
    }
}));

mongoose.model('server', mongoose.Schema({
    game: {
        type: String
    },
    name: {
        type: String
    },
    pid: {
        type: Number
    },
    config: {
        type: String
    },
    owners: [{
        type: mongoose.Schema.Types.ObjectId
    }]
}));

module.exports = {};