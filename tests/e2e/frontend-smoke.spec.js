const { expect, test } = require( '@playwright/test' );

const smokePath = process.env.E2E_SMOKE_PATH;

test.describe( 'EM Block Collection frontend', () => {
	test.skip(
		! smokePath,
		'Set E2E_SMOKE_PATH to a page containing EM blocks.'
	);

	test( 'renders the configured feature, process, and CTA blocks', async ( {
		page,
	} ) => {
		await page.goto( smokePath );

		await expect(
			page.getByRole( 'heading', { name: 'What we can help with' } )
		).toBeVisible();
		await expect(
			page.locator(
				'.wp-block-em-block-collection-feature-cards .em-feature-cards__card'
			)
		).toHaveCount( 3 );
		await expect(
			page.getByRole( 'heading', { name: 'How we work' } )
		).toBeVisible();
		await expect(
			page.getByRole( 'heading', { name: 'Ready to start a project?' } )
		).toBeVisible();
	} );
} );
