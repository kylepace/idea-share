IdeaShare.Views.IdeaView = Backbone.View.extend({

		tagName: 'li',

		className: 'idea',

		events: {
			'click': 'showDetails'
		},

		initialize: function () {
			this.template = _.template($('#idea-listitem-template').html());
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		showDetails: function() {
			this.trigger('clicked', this.model);
		}
});