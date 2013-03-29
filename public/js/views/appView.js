IdeaShare.Views.AppView = Backbone.View.extend({

	el: $('#app'),

	events: {
		'submit #save-idea': 'add'
	},

	initialize: function() {
		this.ideas = new IdeaShare.Collections.Ideas();
		this.ideasHtml = this.$('#ideas');

		this.listenTo(this.ideas, 'add', this.addOne);
		this.listenTo(this.ideas, 'reset', this.addAll);
		this.listenTo(this.ideas, 'all', this.render);
	},

	add: function(e) {
		e.preventDefault();
		var name = $('#idea-name').val();

		if (name !== '' && name !== undefined) {
			this.ideas.add(new IdeaShare.Models.Idea({ name: name }));
			this.clearForm();
		} else {
			alert('You need to have a name for your idea.');
		}
	},

	clearForm: function() {
		$('#idea-name').val('');
	},

	addOne: function(idea) {
		var view = new IdeaShare.Views.IdeaView({ model: idea});

		this.listenTo(view, 'clicked', this.showDetails);

		this.ideasHtml.append(view.render().el);
	},

	addAll: function() {
		this.ideas.each(this.addOne, this);
	},

	showDetails: function(model) {
		this.ideasHtml.hide();
		
		var detailsView = new IdeaShare.Views.IdeaDetailsView({ model: model});

		// Don't know how much i like this idea.  Perhaps move this up here
		// so events don't need to be triggered, its coupled this way.
		this.listenTo(detailsView, 'backToIdeas', this.showIdeas);

		this.$('#idea-details').html(detailsView.render().el);
	},

	showIdeas: function() {
		this.ideasHtml.show();
	}
});