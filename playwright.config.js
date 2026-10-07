const { defineConfig } = require( '@playwright/test' );

module.exports = defineConfig( {
	testDir: './tests/e2e',
	fullyParallel: false,
	timeout: 30_000,
	reporter: 'list',
	use: {
		baseURL: process.env.E2E_BASE_URL || 'http://127.0.0.1:8888',
		ignoreHTTPSErrors: true,
		screenshot: 'only-on-failure',
		trace: 'retain-on-failure',
	},
} );
