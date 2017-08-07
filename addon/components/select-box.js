import Ember from 'ember';
import layout from '../templates/components/select-box';

export default Ember.Component.extend({
	layout
	content: [],
	'prompt': null,
	optionValuePath: null,
	optionLabelPath: null,
	classNames: ['select-box'],

	init() {
		this._super(...arguments);

		if (this.get('content')) {
			return;
		}

		this.set('content', []);
	},

	setSelectedObject: on('didInsertElement', function() {
		if (this.get('optionValuePath') || !this.get('selection')) {
			return;
		}

		this.$('select').val(this.get('selection').get(this.get('optionLabelPath')));
	}),

	// Kind of hacky
	removeClasses: on('willInsertElement', function() {
		this.$().removeClass();
	}),

	actions: {
		change() {
			let selectedIndex = this.$('select').prop('selectedIndex');
			let content = A(this.get('content'));
			let hasPrompt = !!this.get('prompt');
			let contentIndex = hasPrompt ? selectedIndex - 1 : selectedIndex;
			let _selection = content.objectAt(contentIndex) || null;

			this.sendAction('willChangeAction', _selection);

			if (this.get('optionValuePath') && _selection) {
				this.set('selection', _selection[this.get('optionValuePath')]);
			} else {
				this.set('selection', _selection);
			}

			this.sendAction('didChangeAction', _selection);
		}
	}
});
