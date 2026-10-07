import { createElement } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Edit from '../../src/faq-accordion/edit';

jest.mock(
	'@wordpress/block-editor',
	() => ( {
		RichText: ( { onChange, placeholder, value } ) => (
			<input
				aria-label={ placeholder }
				onChange={ ( event ) => onChange( event.target.value ) }
				value={ value }
			/>
		),
		useBlockProps: ( props = {} ) => props,
	} ),
	{ virtual: true }
);

jest.mock(
	'@wordpress/components',
	() => ( {
		Button: ( { children, label, onClick } ) => (
			<button aria-label={ label } onClick={ onClick } type="button">
				{ children || label }
			</button>
		),
	} ),
	{ virtual: true }
);

describe( 'FAQ Accordion editor', () => {
	it( 'adds a blank FAQ from the inline empty state', () => {
		const setAttributes = jest.fn();

		render(
			createElement( Edit, {
				attributes: { faqs: [] },
				setAttributes,
			} )
		);

		fireEvent.click(
			screen.getByRole( 'button', { name: 'Add question' } )
		);

		expect( setAttributes ).toHaveBeenCalledWith( {
			faqs: [ { question: '', answer: '' } ],
		} );
	} );

	it( 'updates question content directly in the block', () => {
		const setAttributes = jest.fn();

		render(
			createElement( Edit, {
				attributes: {
					faqs: [ { question: 'Old question', answer: 'Answer' } ],
				},
				setAttributes,
			} )
		);

		fireEvent.change( screen.getByLabelText( 'Write a question' ), {
			target: { value: 'Updated question' },
		} );

		expect( setAttributes ).toHaveBeenCalledWith( {
			faqs: [ { question: 'Updated question', answer: 'Answer' } ],
		} );
	} );

	it( 'moves an FAQ item down with its inline control', () => {
		const setAttributes = jest.fn();
		const faqs = [
			{ question: 'First', answer: 'First answer' },
			{ question: 'Second', answer: 'Second answer' },
		];

		render(
			createElement( Edit, { attributes: { faqs }, setAttributes } )
		);

		fireEvent.click(
			screen.getAllByRole( 'button', { name: 'Move question down' } )[ 0 ]
		);

		expect( setAttributes ).toHaveBeenCalledWith( {
			faqs: [ faqs[ 1 ], faqs[ 0 ] ],
		} );
	} );
} );
