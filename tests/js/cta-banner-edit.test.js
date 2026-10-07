import { createElement } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Edit from '../../src/cta-banner/edit';

jest.mock(
	'@wordpress/block-editor',
	() => ( {
		InspectorControls: ( { children } ) => <div>{ children }</div>,
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
		PanelBody: ( { children } ) => <section>{ children }</section>,
		SelectControl: ( { label, onChange, options, value } ) => (
			<div>
				{ label }
				<select
					aria-label={ label }
					onChange={ ( event ) => onChange( event.target.value ) }
					value={ value }
				>
					{ options.map( ( option ) => (
						<option key={ option.value } value={ option.value }>
							{ option.label }
						</option>
					) ) }
				</select>
			</div>
		),
		TextControl: ( { label, onChange, value } ) => (
			<div>
				{ label }
				<input
					aria-label={ label }
					onChange={ ( event ) => onChange( event.target.value ) }
					value={ value }
				/>
			</div>
		),
	} ),
	{ virtual: true }
);

jest.mock(
	'@wordpress/i18n',
	() => ( {
		__: ( text ) => text,
	} ),
	{ virtual: true }
);

const attributes = {
	eyebrow: '',
	heading: 'Ready to start a project?',
	content: 'Give your visitors a clear next step.',
	primaryLabel: 'Get in touch',
	primaryUrl: '',
	secondaryLabel: '',
	secondaryUrl: '',
	layout: 'contained',
};

describe( 'CTA Banner editor', () => {
	it( 'updates heading text through the editor control', () => {
		const setAttributes = jest.fn();

		render(
			createElement( Edit, {
				attributes,
				setAttributes,
			} )
		);

		fireEvent.change( screen.getByLabelText( 'Call to action heading' ), {
			target: { value: 'Plan your next project' },
		} );

		expect( setAttributes ).toHaveBeenCalledWith( {
			heading: 'Plan your next project',
		} );
	} );

	it( 'updates the selected layout', () => {
		const setAttributes = jest.fn();

		render(
			createElement( Edit, {
				attributes,
				setAttributes,
			} )
		);

		fireEvent.change( screen.getByLabelText( 'Width' ), {
			target: { value: 'full-width' },
		} );

		expect( setAttributes ).toHaveBeenCalledWith( {
			layout: 'full-width',
		} );
	} );
} );
