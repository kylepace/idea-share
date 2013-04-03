var mongoose = require('mongoose');

module.exports = function() {
    switch (this.env) {
    case 'development':
        mongoose.connect('mongodb://idea-share:idea-share@ds031477.mongolab.com:31477/idea-share');
        break;
    case 'production':
        mongoose.connect('mongodb://mongodb.example.com/prod');
        break;
    }
};