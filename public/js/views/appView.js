IdeaShare.Views.AppView = Backbone.View.extend({

	el: $('#app'),

	events: {
		'submit #save-idea': 'add'
	},

	initialize: function() {
		this.ideas = new IdeaShare.Collections.Ideas();

		this.listenTo(this.ideas, 'add', this.addOne);
		this.listenTo(this.ideas, 'reset', this.addAll);
		this.listenTo(this.ideas, 'all', this.render);
	},

	render: function() {

	},

	add: function(e) {
		e.preventDefault();
		var name = $('#idea-name').val();
		var description = $('#idea-description').val();

		if (name !== '' && name !== undefined) {
			this.ideas.add(new IdeaShare.Models.Idea({
				name: name,
				description: description
			}));
			this.clearForm();
		} else {
			alert('You need to have a name for your idea.');
		}
	},

	clearForm: function() {
		$('#idea-name').val('');
		$('#idea-description').val('');
	},

	addOne: function(idea) {
		var view = new IdeaShare.Views.IdeaView({ model: idea});
		this.$('#ideas').append(view.render().el);
	},

	addAll: function() {
		this.ideas.each(this.addOne, this);
	}
});