var yamvish = require('yamvish');
yamvish.extendAPI('yamvish', 'foundation');
var y = yamvish.initializer('foundation');

yamvish.toAPI('foundation', {
	cssLink: function(src) {
		return this.tag('link',
			y.attr('href', src)
			.attr('rel', 'stylesheet')
		);
	},
	fontawesomeLink: function() {
		return this.cssLink('https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css');
	},
	icon: function(type) {
		return this.tag('i', y.cl('fi-' + type));
	},
	// basical button
	// type : success, secondary, alert, warning, disabled
	simpleButton: function(content, type, templ) {
		return this.button(
			y.if(type, y.cl(type))
			.cl('button'),
			content, templ
		);
	},
	// anchor button
	aButton: function(href, content, type, templ) {
		return this.a(href,
			y.if(type, y.cl(type))
			.cl('button'),
			content,
			templ
		);
	},
	aHollowButton: function(href, content, type, templ) {
		return this.a(href,
			y.if(type, y.cl(type))
			.cl('button')
			.cl('hollow'),
			content,
			templ
		);
	},
	// hollow button
	hollowButton: function(content, type, templ) {
		return this.simpleButton(content, type, y.cl('hollow'));
	},
	// close button
	closeButton: function(dataClose, templ) {
		return this.button(
			y.cl('close-button')
			.attr('aria-label', 'Close alert')
			.attr('type', 'button')
			.if(dataClose, y.data('close'))
			.span(y.attr('aria-hidden', 'true'), '\u00D7'),
			templ
		);
	},
	// button group
	buttonGroup: function(buttons) {
		return this.div(y.cl('button-group'), buttons);
	},
	smallButtonGroup: function(buttons) {
		return this.div(
			y.cl('small')
			.cl('button-group'),
			buttons
		);
	},
	// switch
	switchButton: function(name, text) {
		return this.div(
			y.cl('switch')
			.input('checkbox', '',
				y.id(name)
				.cl('show-for-sr')
				.attr('name', name)
			)
			.tag('label',
				y.cl('switch-paddle')
				.attr('for', name)
				.span(
					y.cl('show-for-sr')
					.text(text)
				)
			)
		);
	},
	// radioSwitch
	radioSwitch: function(groupName, text) {
		return this.div(
			y.cl('switch')
			.input('radio', '',
				y.id(name)
				.attr('name', groupName)
			)
			.tag('label',
				y.cl('switch-paddle')
				.attr('for', name)
				.span(
					y.cl('show-for-sr'),
					text
				)
			)
		);
	},
	badge: function(text, type) {
		return this.span(y.cl('badge').if(type, y.cl(type)), text);
	},
	coloredLabel: function(text, type) {
		return this.span(y.cl('label').if(type, y.cl(type)), text);
	},
	tooltip: function(title, text, opt) {
		opt = opt || {};
		return this.span(
			y.cl('has-tip')
			.if(opt.top, y.cl('top'))
			.data('tooltip')
			.if(opt.noClickOpen, y.data('clickOpen', false))
			.attr('aria-haspopup', true)
			.data('disableHover', false)
			.attr('tabindex', '1')
			.attr('title', title)
			.dom(function(ctx, node) {
				new Foundation.Tooltip($(node), {});
			}),
			text
		);
	},
	breadcrumb: function(label, elements) {
		return this
			.nav(y.attr('aria-label', label)
				.attr('role', 'navigation')
				.ul(
					y.cl('breadcrumbs')
					.li(y.a('#', 'Home'))
					.li(y.a('#', 'Features'))
					.li(y.cl('disabled'), 'Gene Splicing')
					.li(
						y.span(y.cl('show-for-sr'), 'Current: '),
						' Cloning'
					)
				)
			);
	},
	offCanvas: function(leftMenuContent, content, rightMenuContent) {
		return this.div(
			y.cl('off-canvas-wrapper')
			.div(
				y.cl('off-canvas-wrapper-inner')
				.data('offCanvasWrapper')
				.if(leftMenuContent,
					y.div(
						y.cl('off-canvas')
						.cl('position-left')
						.attr('id', 'offCanvas')
						.data('offCanvas', true)
						.closeButton(true),
						leftMenuContent
					))
				.div(
					y.cl('off-canvas')
					.cl('position-right')
					.attr('id', 'offCanvasRight')
					.data('offCanvas', true)
					.data('position', 'right'),
					content
				)
				.if(rightMenuContent,
					y.div(
						y.cl('off-canvas-content')
						.data('offCanvasContent', true)
						.closeButton(true),
						rightMenuContent
					))
			)
		);
	},

	topBar: function(contentLeft, contentRight) {
		return this.div(
			y.cl('top-bar')
			.div(
				y.cl('top-bar-left'),
				contentLeft
			)
			.div(
				y.cl('top-bar-right'),
				contentRight
			)
		);
	},
	callout: function(type, content) {
		return this.div(
			y.cl(type || 'info')
			.cl('callout')
			.p(content || 'no content!')
		);
	},
	closableCallout: function(type, content) {
		return this.div(
			y.cl('callout')
			.cl(type || 'info')
			.data('closable')
			.p(content || 'no content!')
			.closeButton(true)
		);
	},
	/********************************
	 ****************** FORM ********
	 ********************************/
	fieldSet: function(legend, content) {
		return this.tag('fieldset',
			y.cl('fieldset')
			.tag('legend', legend),
			content
		);
	},
	helpText: function(targetId, text) {
		return this.p(
			y.cl('help-text')
			.attr('id', targetId),
			text
		);
	},
	radioInput: function(opt) {
		opt.id = opt.id || opt.name + opt.value;
		return this
			.input('radio', opt.value,
				y.attr('name', opt.name)
				.attr('id', opt.id)
				.if(opt.required, y.attr('required', ''))
			)
			.label(
				y.attr('for', opt.id),
				opt.text || opt.value
			);
	},
	checkboxInput: function(id, value, text) {
		return this.input('checkbox', value, y.attr('id', id))
			.label(y.attr('for', id), text);
	},
	inlineLabelInputRow: function(opt) {
		return this.div(
			y.cl('row')
			.div(
				y.cl('small-3')
				.cl('columns')
				.label(
					y.cl('text-right')
					.cl('middle')
					.attr('for', opt.id),
					opt.label
				)
			)
			.div(
				y.cl('small-9')
				.cl('columns')
				.input('text', opt.value,
					y.attr('id', opt.id)
					.if(opt.placeholder, y.attr('placeholder', opt.placeholder))
				)
			)
		);
	},
	inlineInvertedLabelInputButton: function(opt) {
		return this
			.div(
				y.cl('input-group')
				.span(y.cl('input-group-label'), opt.label)
				.input(opt.type || 'text', opt.value || '',
					y.cl('input-group-field')
					.if(opt.required, y.prop('required', true))
					.if(opt.placeholder, y.attr('placeholder', opt.placeholder))
				)
				.div(
					y.cl('input-group-button')
					.input('submit', opt.buttonText || 'Submit', y.cl('button'))
				)
			);
	},
	fileUploadButton: function(id, text) {
		return this
			.tag('label',
				y.cl('button')
				.attr('for', id),
				text
			)
			.input('file', '',
				y.cl('show-for-sr')
				.id(id)
			);
	},
	thumbnail: function(src, alt) {
		return this.img(
			y.cl('thumbnail')
			.attr('src', src)
			.attr('alt', alt ||  'image with no alternate text')
		);
	},
	multiLevelAccordionMenu: function(children) {
		return this.div(
			y.cl('multi-level-accordion-menu')
			.ul(
				y.cl('accordion-menu')
				.data('accordionMenu', true)
				.cl('vertical'),
				children,
				y.dom(function(ctx, node) {
					new Foundation.AccordionMenu($(node), {});
				})
			)
		);
	},
	multiLevelAccordionSubMenu: function(name, depth, children) {
		return this.li(
			y.a('#', name)
			.ul(
				y.cl('menu')
				.cl('vertical')
				.cl('sublevel-' + depth),
				children
			)
		);
	},
	multiLevelAccordionMenuLeaf: function(href, content) {
		return this.li(
			y.a(href,
				y.cl('subitem'),
				content
			)
		);
	},
	testAccordionMenu: function() {
		return this.multiLevelAccordionMenu(
			y.multiLevelAccordionMenuLeaf('#', 'hello root 1')
			.multiLevelAccordionSubMenu('Item 1', 1,
				y.multiLevelAccordionMenuLeaf('#', 'hello world')
				.multiLevelAccordionSubMenu('Item 1.2', 2,
					y.multiLevelAccordionMenuLeaf('#', 'hello world 1')
					.multiLevelAccordionMenuLeaf('#', 'hello world 2')
					.multiLevelAccordionMenuLeaf('#', 'hello world 3')
				)
			)
			.multiLevelAccordionSubMenu('Item 2', 1,
				y.multiLevelAccordionMenuLeaf('#', 'hello bloupi')
				.multiLevelAccordionMenuLeaf('#', 'hello bloupi 2')
				.multiLevelAccordionSubMenu('Item 2.2', 2,
					y.multiLevelAccordionMenuLeaf('#', 'hello foo 1')
					.multiLevelAccordionMenuLeaf('#', 'hello foo 2')
					.multiLevelAccordionMenuLeaf('#', 'hello foo 3')
				)
			)
		);
	},
	dropDown: function() {
		return this.ul(
			y.cl('dropdown')
			.cl('menu')
			.data('dropdownMenu')
			.li(y.a('#', 'Item 1'))
			.li(y.a('#', 'Item 2'))
			.li(y.a('#', 'Item 3'))
			.li(y.a('#', 'Item 4'))
		)
	},
	productCard: function(title, price, imgSrc, details) {
		return this.div(
			y.cl('product-card')
			.cl('item-wrapper')
			.div(
				y.cl('img-wrapper')
				.a('#',
					y.cl('button')
					.cl('expand')
					.cl('add-to-cart'),
					'Add to Cart'
				)
				.a('#', y.img(imgSrc))
			)
			.a('#', y.h(3, title))
			.h(5, price)
			.p(details)
		)
	},
	foundationModal: function(id, title, lead, content) {
		return this.div(
			y.cl('reveal')
			.data('animationIn', 'fade-in')
			.data('animationOut', 'fade-out')
			.id(id)
			.data('reveal')
			.h(1, title)
			.p(y.cl('lead'), lead),
			content,
			y.closeButton(true)
		);
	}
});