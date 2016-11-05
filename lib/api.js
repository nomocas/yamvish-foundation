/**
 * Foundation 6 api for yamvish
 */

var yamvish = require('yamvish');
require('yamvish-transition');
yamvish.extendAPI('yamvish', 'foundation');
var y = yamvish('foundation');

yamvish.toAPI('foundation', {
	// basical button
	simpleButton: function(content, type, templ) {
		return this.button(
			y.if(type, y.cl(type))
			.cl('button'),
			content, templ
		);
	},
	// hollow button
	hollowButton: function(content, type, templ) {
		return this.button(
			y.if(type, y.cl(type))
			.cl('button')
			.cl('hollow'),
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
	// close button : for closing action : templ = y.data('close') || y.click(...)
	closeButton: function(templ) {
		return this.button(
			y.cl('close-button')
			.attr('aria-label', 'Close alert')
			.attr('type', 'button')
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
	/**
	 * MISC
	 */

	icon: function(type) {
		return this.tag('i', y.cl('fi-' + type));
	},
	badge: function(text, type) {
		return this.span(y.cl('badge').if(type, y.cl(type)), text);
	},
	coloredLabel: function(text, type) {
		return this.span(y.cl('label').if(type, y.cl(type)), text);
	},

	/**
	 * HELPERS
	 */

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
	// breadcrumb: function(label, elements) {
	// 	return this
	// 		.nav(y.attr('aria-label', label)
	// 			.attr('role', 'navigation')
	// 			.ul(
	// 				y.cl('breadcrumbs')
	// 				.li(y.a('#', 'Home'))
	// 				.li(y.a('#', 'Features'))
	// 				.li(y.cl('disabled'), 'Gene Splicing')
	// 				.li(
	// 					y.span(y.cl('show-for-sr'), 'Current: '),
	// 					' Cloning'
	// 				)
	// 			)
	// 		);
	// },

	/********************************
	 ****************** FORM ********
	 ********************************/

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
	radio: function(opt) {
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
	checkbox: function(id, value, text) {
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
	/**
	 * an input-group with coloredLabel-input-button
	 * @param  {Object} opt { label:String|Template, value:*, required:Bool(false by def), placeholder:String, buttonText:String|Template }
	 * @return {Template}     chainable
	 */
	inlineColoredLabelInputButton: function(opt) {
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
					// warning : foundation 6.2.4 button height issue that has been corrected in develop branch for the moment
					// see : https://github.com/zurb/foundation-sites/pull/9308/files
					y.cl('input-group-button')
					.primaryButton(opt.buttonText || 'Submit', y.cl('button'))
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

	/**
	 * THUMBNAILS
	 */

	thumbnail: function(src, alt, templ) {
		return this.img(
			y.cl('thumbnail')
			.attr('src', src)
			.attr('alt', alt ||  'image with no alternate text'),
			templ
		);
	},
	roundedThumbnail: function(src, alt, templ) {
		return this.img(
			y
			.cl('thumbnail')
			.cl('rounded')
			.attr('src', src)
			.attr('alt', alt ||  'image with no alternate text'),
			templ
		);
	},
	background: function(url, backgroundSize) {
		url = yamvish.interpolable(url);
		backgroundSize = backgroundSize || 'cover';
		return this
			.dom(function(context, node) {
				var update = function(value) {
					node.style.background = 'url(' + value + ') no-repeat center center';
					node.style.backgroundSize = backgroundSize;
				};
				if (url.__interpolable__) {
					node.binds = node.binds ||  [];
					url.subscribeTo(context, update, node.binds);
					update(url.output(context));
				} else
					update(url);
			});
	},
	/**
	 * NAV
	 */

	// subNav: function(title, label) {
	// 	return this.ul(
	// 		y.cl("sub-nav")
	// 		.cl("menu")
	// 		.attr("role", "navigation")
	// 		// label title
	// 		.attr("title", label)
	// 		// title
	// 		.li(y.cl("sub-nav-title"), title)
	// 		// children
	// 		.li(
	// 			y.cl("active")
	// 			.span(
	// 				y.cl("show-for-sr"),
	// 				"You're viewing "
	// 			)
	// 			.a(y.prop("href"), "All")
	// 		)
	// 		.li(y.a(y.attr("href", "#"), "Active"))
	// 		.li(y.a(y.attr("href", "#"), "Pending"))
	// 		.li(y.a(y.attr("href", "#"), "Suspended"))
	// 	);
	// },

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
	dropDown: function(items) {
		return this.ul(
			y.cl('dropdown')
			.cl('menu')
			.data('dropdownMenu')
			._each(items, function(lexem) {
				if (lexem.name === 'tag')
					this.li(new Template(lexem));
				else
					this.use(lexem);
			})
		)
	},

	/***********************************
	 *************** CARDS *************
	 ***********************************/

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

	/***********************************
	 *************** CONTAINERS ********
	 ***********************************/
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
						.closeButton(y.data('close')),
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
						.closeButton(y.data('close')),
						rightMenuContent
					))
			)
		);
	},
	overlayPanel: function(opt) {
		return this.agoraView(opt.name, y.div(
			y.cl('overlay-panel')
			.if(!opt.noBackground, y.overlayPanelBackground(opt.backgroundOpacity, opt.closeOnBackgroundClick)),
			opt.content
		));
	},
	overlayPanelBackground: function(opacity, closeOnBackgroundClick) {
		return this.div(
			y.cl('overlay-panel-background')
			.use('transition:fade', {
				max: opacity || 0.5,
				ms: 200
			}).if(closeOnBackgroundClick, y.click(function(e) {
				e.targetContainer.unmount(true);
			}))
		);
	},
	sidePanel: function(opt) {
		return this.overlayPanel({
			name: opt.name,
			closeOnBackgroundClick: true,
			content: y.div(
				y.cl('side-panel')
				.cl('side-panel--' + opt.side)
				.if(opt.side === 'left' || opt.side === 'right',
					yamvish('transition').slideLeft({
						max: opt.width || '300px',
						delay: opt.delay || 0,
						ms: opt.ms || 350
					}),
					yamvish('transition').slideUp({
						max: opt.height || '300px',
						delay: opt.delay || 0,
						ms: opt.ms || 350
					})
				)
				.div(
					y.cl('side-panel-content')
					.if(opt.side === 'left' || opt.side === 'right',
						y.css('width', opt.width),
						y.css('height', opt.height)
					),
					opt.content
				)
				.closeButton(y.click(function(e) {
					e.targetContainer.unmount(true);
				}))
			)
		});
	},

	/***********************************
	 ************** DIALOGS ************
	 ***********************************/

	callout: function(type, closable, content) {
		return this.div(
			y.cl('callout')
			.cl(type)
			.p(content || 'no content!')
			.if(closable,
				y.data('closable')
				.closeButton(y.data('close'))
			)
		);
	},
	dialog: function(type, templ, close) {
		return this.div(
			y.cl('dialog')
			.cl(type) // if "type" is attrMap : catch inner prop
			.if(close, y.closeButton(close)),
			templ
		);
	},

	/***********************************
	 *********** DIALOGS PANEL *********
	 ***********************************/

	confirmPanel: function() {
		return this.overlayPanel({
			name: 'dialog:confirm',
			content: y.toMethods({
					validate: function(e) {
						e.preventDefault();
						e.targetContainer.unmount(true);
						this.data.callback(true);
					},
					cancel: function(e) {
						e.preventDefault();
						e.targetContainer.unmount(true);
						this.data.callback(false);
					}
				})
				.cl('confirm-panel')
				.warningDialog(
					y.h(3, '{{ title }}')
					.p('{{ message }}')
					.use('transition:fade', {
						ms: 200
					})
					.div(
						y.cl('dialog-buttons-container')
						.warningButton(y.click('validate'), '\u2713')
						.alertButton(y.click('cancel'), '\u00D7')
					)
				)
		});
	},
	alertPanel: function() {
		return this.overlayPanel({
			name: 'dialog:alert',
			closeOnBackgroundClick: true,
			content: y
				.toMethods('hide', function(e) {
					e.preventDefault();
					e.targetContainer.unmount(true);
				})
				.cl('alert-panel')
				.alertDialog(
					y.h(3, '{{ title }}')
					.p('{{ message }}')
					.use('transition:fade', {
						ms: 200
					})
					.div(
						y.cl('dialog-buttons-container')
						.alertButton(y.click('hide'), '\u2713')
					),
					y.click('hide')
				)
		});
	},
	// uikit modal :
	uikitModal: function(name, content) {
		return this.overlayPanel({
			name: name,
			closeOnBackgroundClick: true,
			content: y
				.toMethods('hide', function(e) {
					e.preventDefault();
					e.targetContainer.unmount(true);
				})
				.cl('uik-modal')
				.dialog('uik-modal-dialog',
					y.use('transition:fade', {
						ms: 200
					})
					.use(content),
					y.click('hide')
				)
		});
	},
	// reveal modal :
	// modal: function(id, title, lead, content) {
	// 	return this.div(
	// 		y.cl('reveal')
	// 		.data('animationIn', 'fade-in')
	// 		.data('animationOut', 'fade-out')
	// 		.id(id)
	// 		.data('reveal')
	// 		.h(1, title)
	// 		.p(y.cl('lead'), lead),
	// 		content,
	// 		y.closeButton(y.data('close'))
	// 	);
	// },

});

var coloredAPI = {};
['primary', 'secondary', 'success', 'alert', 'warning']
.forEach(function(color) {
	coloredAPI[color + 'Dialog'] = function(templ, close) {
		return this.dialog(color, templ, close);
	};
	coloredAPI[color + 'Callout'] = function(closable, content) {
		return this.callout(color, closable, content);
	};
	coloredAPI[color + 'Button'] = function(content, templ) {
		return this.simpleButton(content, color, templ);
	};
	coloredAPI[color + 'AButton'] = function(href, content, templ) {
		return this.aButton(href, content, color, templ);
	};
	coloredAPI[color + 'AHollowButton'] = function(href, content, templ) {
		return this.aHollowButton(href, content, color, templ);
	};
	coloredAPI[color + 'HollowButton'] = function(content, templ) {
		return this.hollowButton(content, color, templ)
	};
	coloredAPI[color + 'Badge'] = function(text) {
		return this.badge(text, color);
	};
	coloredAPI[color + 'Label'] = function(text) {
		return this.coloredLabel(text, color)
	};
});

yamvish.toAPI('foundation', coloredAPI);