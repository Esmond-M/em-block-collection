import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const newItem = {
	icon: '00',
	title: __( 'New feature', 'em-block-collection' ),
	content: __(
		'Describe the value this feature provides.',
		'em-block-collection'
	),
};

export default function Edit( { attributes, setAttributes } ) {
	const updateItem = ( index, property, value ) => {
		const items = attributes.items.map( ( item, itemIndex ) =>
			itemIndex === index ? { ...item, [ property ]: value } : item
		);
		setAttributes( { items } );
	};

	const removeItem = ( index ) => {
		setAttributes( {
			items: attributes.items.filter(
				( item, itemIndex ) => itemIndex !== index
			),
		} );
	};

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Layout', 'em-block-collection' ) }>
					<SelectControl
						label={ __( 'Columns', 'em-block-collection' ) }
						value={ attributes.columns }
						options={ [
							{
								label: __(
									'Two columns',
									'em-block-collection'
								),
								value: 2,
							},
							{
								label: __(
									'Three columns',
									'em-block-collection'
								),
								value: 3,
							},
						] }
						onChange={ ( columns ) =>
							setAttributes( { columns: Number( columns ) } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps }>
				<RichText
					tagName="h2"
					className="em-feature-cards__heading"
					value={ attributes.heading }
					placeholder={ __(
						'Section heading',
						'em-block-collection'
					) }
					onChange={ ( heading ) => setAttributes( { heading } ) }
				/>
				<div
					className={ `em-feature-cards__grid columns-${ attributes.columns }` }
				>
					{ attributes.items.map( ( item, index ) => (
						<article
							className="em-feature-cards__card"
							key={ `${ item.title }-${ index }` }
						>
							<TextControl
								label={ __(
									'Card marker',
									'em-block-collection'
								) }
								value={ item.icon }
								onChange={ ( icon ) =>
									updateItem( index, 'icon', icon )
								}
							/>
							<RichText
								tagName="h3"
								className="em-feature-cards__title"
								value={ item.title }
								placeholder={ __(
									'Feature title',
									'em-block-collection'
								) }
								onChange={ ( title ) =>
									updateItem( index, 'title', title )
								}
							/>
							<RichText
								tagName="p"
								className="em-feature-cards__description"
								value={ item.content }
								placeholder={ __(
									'Feature description',
									'em-block-collection'
								) }
								onChange={ ( content ) =>
									updateItem( index, 'content', content )
								}
							/>
							<Button
								isDestructive
								onClick={ () => removeItem( index ) }
							>
								{ __( 'Remove card', 'em-block-collection' ) }
							</Button>
						</article>
					) ) }
				</div>
				<Button
					isSecondary
					onClick={ () =>
						setAttributes( {
							items: [ ...attributes.items, newItem ],
						} )
					}
				>
					{ __( 'Add card', 'em-block-collection' ) }
				</Button>
			</section>
		</>
	);
}
