var locomotive = require('locomotive'),
    Controller = locomotive.Controller;

var PagesController = new Controller();

PagesController.main = function() {
    this.title = 'Idea Share';
    this.user = this.req.user;
    this.render();
};

module.exports = PagesController;