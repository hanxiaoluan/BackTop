// eslint-disable-next-line no-undef
module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'@typescript-eslint'
	],
	'rules': {
		'indent': [
			'error',
			'tab',

			// { 'MemberExpression': 1 }
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'object-curly-spacing': [ 'error', 'always' ],
		'array-bracket-spacing': [ 'error', 'always' ],
		'key-spacing': [ 'error', { 'beforeColon': false, 'afterColon': true } ],
		'comma-spacing': [ 'error', { before: false, 'after': true } ],
		'arrow-spacing': [ 'error', { before: true, after: true } ],
		'block-spacing': [ 'error' ],
		'@typescript-eslint/type-annotation-spacing': [ 'error', { 'before': false, 'after': true } ],
		'react/prop-types': 0,
		'react/display-name': 0,

		// 'no-multi-spaces': 'error',
		'lines-between-class-members': 'error',
		'newline-per-chained-call': [ 'error', { 'ignoreChainWithDepth': 1 } ],
		'react/jsx-closing-tag-location': 'error',
		'react/jsx-curly-spacing': [ 'error', { 'when': 'never', 'children': false } ],
		'lines-around-comment': [ 'error', { 'beforeBlockComment': true, 'beforeLineComment': true } ],
		'space-infix-ops': 'error',
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/explicit-module-boundary-types': 0,
		'space-before-blocks': 'error',
		'keyword-spacing': 'error'
	}
}
