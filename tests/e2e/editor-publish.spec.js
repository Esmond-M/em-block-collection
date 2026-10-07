const { expect, test } = require( '@playwright/test' );

const username = process.env.WP_ADMIN_USERNAME;
const password = process.env.WP_ADMIN_PASSWORD;

test.describe( 'EM Block Collection editor', () => {
	test.skip(
		! username || ! password,
		'Set WP_ADMIN_USERNAME and WP_ADMIN_PASSWORD to run editor publishing checks.'
	);

	test( 'inserts and publishes a CTA Banner', async ( { page } ) => {
		await page.goto( '/wp-login.php' );
		await page.getByLabel( 'Username or Email Address' ).fill( username );
		await page.getByLabel( 'Password' ).fill( password );
		await page.getByRole( 'button', { name: 'Log In' } ).click();

		await page.goto( '/wp-admin/post-new.php?post_type=page' );
		await page
			.getByRole( 'textbox', { name: 'Add title' } )
			.fill( 'EM Block Collection smoke test' );
		await page.getByRole( 'button', { name: 'Add block' } ).click();
		await page.getByPlaceholder( 'Search' ).fill( 'EM CTA Banner' );
		await page.getByText( 'EM CTA Banner', { exact: true } ).click();

		await expect(
			page.locator( '[data-type="em-block-collection/cta-banner"]' )
		).toBeVisible();

		const publishButton = page.getByRole( 'button', { name: 'Publish' } );
		await publishButton.first().click();
		await publishButton.last().click();
		await expect( page.getByText( 'Page published.' ) ).toBeVisible();
	} );
} );
