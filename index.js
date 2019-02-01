'use strict';

module.exports = function (options) {
	options = Object.assign({}, {isPropsOmitted: false}, options);
	
	return function (context, name) {
		if (options.isPropsOmitted) return (name in context.props) && (typeof context.props[name] === 'string');
		
		if (name in context.props) {
			return !!context.props[name];
		}
		
		return context.data.attrs && (name in context.data.attrs);
	};
};
