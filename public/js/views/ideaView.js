IdeaShare.Views.IdeaView = Backbone.View.extend({

		tagName: 'li',
		
		className: 'idea',

		initialize: function () {
			this.template = _.template($('#idea-template').html());
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
});