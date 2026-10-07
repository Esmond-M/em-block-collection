import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { Button, PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `is-layout-${ attributes.layout }`,
	} );
	const selectImage = ( media ) =>
		setAttributes( {
			imageId: media.id,
			imageUrl: media.url,
			imageAlt: media.alt || '',
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Layout', 'em-block-collection' ) }>
					<SelectControl
						label={ __(
							'Attribution layout',
							'em-block-collection'
						) }
						value={ attributes.layout }
						options={ [
							{
								label: __( 'Stacked', 'em-block-collection' ),
								value: 'stacked',
							},
							{
								label: __( 'Inline', 'em-block-collection' ),
								value: 'inline',
							},
						] }
						onChange={ ( layout ) => setAttributes( { layout } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Portrait', 'em-block-collection' ) }>
					<MediaUploadCheck>
						<MediaUpload
							allowedTypes={ [ 'image' ] }
							value={ attributes.imageId }
							onSelect={ selectImage }
							render={ ( { open } ) => (
								<Button variant="secondary" onClick={ open }>
									{ attributes.imageUrl
										? __(
												'Replace portrait',
												'em-block-collection'
										  )
										: __(
												'Select portrait',
												'em-block-collection'
										  ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					{ attributes.imageUrl && (
						<Button
							isDestructive
							onClick={ () =>
								setAttributes( {
									imageId: undefined,
									imageUrl: '',
									imageAlt: '',
								} )
							}
						>
							{ __( 'Remove portrait', 'em-block-collection' ) }
						</Button>
					) }
				</PanelBody>
			</InspectorControls>
			<figure { ...blockProps }>
				<RichText
					tagName="blockquote"
					className="em-testimonial__quote"
					value={ attributes.quote }
					placeholder={ __( 'Client quote', 'em-block-collection' ) }
					onChange={ ( quote ) => setAttributes( { quote } ) }
				/>
				<figcaption className="em-testimonial__attribution">
					{ attributes.imageUrl && (
						<img
							className="em-testimonial__image"
							src={ attributes.imageUrl }
							alt={ attributes.imageAlt }
						/>
					) }
					<span>
						<RichText
							tagName="strong"
							className="em-testimonial__name"
							value={ attributes.name }
							placeholder={ __(
								'Client name',
								'em-block-collection'
							) }
							onChange={ ( name ) => setAttributes( { name } ) }
						/>
						<RichText
							tagName="span"
							className="em-testimonial__role"
							value={ attributes.role }
							placeholder={ __(
								'Role or company',
								'em-block-collection'
							) }
							onChange={ ( role ) => setAttributes( { role } ) }
						/>
					</span>
				</figcaption>
			</figure>
		</>
	);
}
