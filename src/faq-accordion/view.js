// Frontend FAQ Accordion JS (optional for interactivity)
document.addEventListener( 'DOMContentLoaded', function () {
	const accordions = document.querySelectorAll(
		'.em-faq-accordion .faq-question'
	);
	accordions.forEach( ( btn ) => {
		btn.addEventListener( 'click', function () {
			const expanded = btn.getAttribute( 'aria-expanded' ) === 'true';

			// Close all other items in the same accordion
			const parent = btn.closest( '.em-faq-accordion' );
			parent
				.querySelectorAll( '.faq-question' )
				.forEach( ( otherBtn ) => {
					if ( otherBtn !== btn ) {
						otherBtn.setAttribute( 'aria-expanded', 'false' );
						const otherAnswer = otherBtn.nextElementSibling;
						if ( otherAnswer ) {
							otherAnswer.classList.remove( 'is-open' );
							otherAnswer.setAttribute( 'aria-hidden', 'true' );
						}
					}
				} );

			btn.setAttribute( 'aria-expanded', String( ! expanded ) );
			const answer = btn.nextElementSibling;
			if ( answer ) {
				if ( ! expanded ) {
					answer.classList.add( 'is-open' );
					answer.setAttribute( 'aria-hidden', 'false' );
				} else {
					answer.classList.remove( 'is-open' );
					answer.setAttribute( 'aria-hidden', 'true' );
				}
			}
		} );
	} );
} );
