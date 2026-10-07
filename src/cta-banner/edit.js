import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `is-layout-${ attributes.layout }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Layout', 'em-block-collection' ) }>
					<SelectControl
						label={ __( 'Width', 'em-block-collection' ) }
						value={ attributes.layout }
						options={ [
							{
								label: __( 'Contained', 'em-block-collection' ),
								value: 'contained',
							},
							{
								label: __(
									'Full width',
									'em-block-collection'
								),
								value: 'full-width',
							},
						] }
						onChange={ ( layout ) => setAttributes( { layout } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Actions', 'em-block-collection' ) }>
					<TextControl
						label={ __(
							'Primary button label',
							'em-block-collection'
						) }
						value={ attributes.primaryLabel }
						onChange={ ( primaryLabel ) =>
							setAttributes( { primaryLabel } )
						}
					/>
					<TextControl
						label={ __(
							'Primary button URL',
							'em-block-collection'
						) }
						type="url"
						value={ attributes.primaryUrl }
						onChange={ ( primaryUrl ) =>
							setAttributes( { primaryUrl } )
						}
					/>
					<TextControl
						label={ __(
							'Secondary button label',
							'em-block-collection'
						) }
						value={ attributes.secondaryLabel }
						onChange={ ( secondaryLabel ) =>
							setAttributes( { secondaryLabel } )
						}
					/>
					<TextControl
						label={ __(
							'Secondary button URL',
							'em-block-collection'
						) }
						type="url"
						value={ attributes.secondaryUrl }
						onChange={ ( secondaryUrl ) =>
							setAttributes( { secondaryUrl } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps }>
				<div className="em-cta-banner__content">
					<RichText
						tagName="p"
						className="em-cta-banner__eyebrow"
						placeholder={ __(
							'Optional eyebrow',
							'em-block-collection'
						) }
						value={ attributes.eyebrow }
						onChange={ ( eyebrow ) => setAttributes( { eyebrow } ) }
					/>
					<RichText
						tagName="h2"
						className="em-cta-banner__heading"
						placeholder={ __(
							'Call to action heading',
							'em-block-collection'
						) }
						value={ attributes.heading }
						onChange={ ( heading ) => setAttributes( { heading } ) }
					/>
					<RichText
						tagName="p"
						className="em-cta-banner__description"
						placeholder={ __(
							'Supporting copy',
							'em-block-collection'
						) }
						value={ attributes.content }
						onChange={ ( content ) => setAttributes( { content } ) }
					/>
				</div>
				<div className="em-cta-banner__actions">
					{ attributes.primaryLabel && (
						<span className="em-cta-banner__button em-cta-banner__button--primary">
							{ attributes.primaryLabel }
						</span>
					) }
					{ attributes.secondaryLabel && (
						<span className="em-cta-banner__button em-cta-banner__button--secondary">
							{ attributes.secondaryLabel }
						</span>
					) }
				</div>
			</section>
		</>
	);
}
