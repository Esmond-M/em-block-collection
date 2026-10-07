import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { Button, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const newStep = {
	title: __( 'New step', 'em-block-collection' ),
	content: __( 'Describe this stage of the process.', 'em-block-collection' ),
};

export default function Edit( { attributes, setAttributes } ) {
	const updateStep = ( index, property, value ) => {
		const steps = attributes.steps.map( ( step, stepIndex ) =>
			stepIndex === index ? { ...step, [ property ]: value } : step
		);
		setAttributes( { steps } );
	};
	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Steps', 'em-block-collection' ) }
					initialOpen={ false }
				>
					<p>
						{ __(
							'Edit each step directly in the block preview.',
							'em-block-collection'
						) }
					</p>
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps }>
				<RichText
					tagName="h2"
					className="em-process-steps__heading"
					value={ attributes.heading }
					placeholder={ __(
						'Section heading',
						'em-block-collection'
					) }
					onChange={ ( heading ) => setAttributes( { heading } ) }
				/>
				<ol className="em-process-steps__list">
					{ attributes.steps.map( ( step, index ) => (
						<li
							className="em-process-steps__item"
							key={ `${ step.title }-${ index }` }
						>
							<RichText
								tagName="h3"
								className="em-process-steps__title"
								value={ step.title }
								placeholder={ __(
									'Step title',
									'em-block-collection'
								) }
								onChange={ ( title ) =>
									updateStep( index, 'title', title )
								}
							/>
							<RichText
								tagName="p"
								className="em-process-steps__description"
								value={ step.content }
								placeholder={ __(
									'Step description',
									'em-block-collection'
								) }
								onChange={ ( content ) =>
									updateStep( index, 'content', content )
								}
							/>
							<Button
								isDestructive
								onClick={ () =>
									setAttributes( {
										steps: attributes.steps.filter(
											( item, itemIndex ) =>
												itemIndex !== index
										),
									} )
								}
							>
								{ __( 'Remove step', 'em-block-collection' ) }
							</Button>
						</li>
					) ) }
				</ol>
				<Button
					isSecondary
					onClick={ () =>
						setAttributes( {
							steps: [ ...attributes.steps, newStep ],
						} )
					}
				>
					{ __( 'Add step', 'em-block-collection' ) }
				</Button>
			</section>
		</>
	);
}
