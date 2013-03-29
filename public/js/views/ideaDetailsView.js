IdeaShare.Views.IdeaDetailsView = Backbone.View.extend({

	tagName: 'div',

	events: {
		'click #back-to-ideas': 'backToIdeas'
	},

	initialize: function() {
		this.template = _.template($('#idea-details-template').html());
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	backToIdeas: function(e) {
		e.preventDefault();
		this.remove();
		this.trigger('backToIdeas');
	}
});