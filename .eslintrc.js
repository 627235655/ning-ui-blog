module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: ['plugin:react/recommended', 'airbnb', 'airbnb/hooks'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {},
	settings: {
		'import/resolver': {
			typescript: {
				// 配置 eslint-import-resolver-typescript 读取 tsconfig.json 的路径
				// 目前用不着，先注释掉
				// directory: [resolve('./src/tsconfig.json'), resolve('./scripts/tsconfig.json')],
			},
		},
	},
};
