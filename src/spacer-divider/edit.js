/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { 
	PanelBody, 
	ToggleControl, 
	RangeControl,
	SelectControl,
	ColorPicker,
	TextControl,
	__experimentalUnitControl as UnitControl
} from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		spacingTop,
		spacingBottom,
		showDivider,
		dividerStyle,
		dividerColor,
		dividerWidth,
		dividerPosition,
		dividerLength,
		dividerAlignment,
		customClass
	} = attributes;

	const blockProps = useBlockProps({
		className: `em-spacer-divider ${customClass}`,
		style: {
			paddingTop: `${spacingTop}px`,
			paddingBottom: `${spacingBottom}px`,
			minHeight: `${spacingTop + spacingBottom}px`
		}
	});

	const dividerStyles = {
		position: 'absolute',
		[dividerPosition]: dividerPosition === 'center' ? '50%' : '0',
		transform: dividerPosition === 'center' ? 'translateY(-50%)' : 'none',
		left: dividerAlignment === 'left' ? '0' : dividerAlignment === 'right' ? 'auto' : '50%',
		right: dividerAlignment === 'right' ? '0' : 'auto',
		marginLeft: dividerAlignment === 'center' ? `-${dividerLength/2}%` : '0',
		width: `${dividerLength}%`,
		height: `${dividerWidth}px`,
		backgroundColor: dividerColor,
		borderStyle: dividerStyle,
		borderWidth: dividerStyle !== 'solid' ? `${dividerWidth}px` : '0',
		borderColor: dividerColor,
		backgroundColor: dividerStyle === 'solid' ? dividerColor : 'transparent'
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Spacing Settings', 'em-block-collection')} initialOpen={true}>
					<RangeControl
						label={__('Top Spacing (px)', 'em-block-collection')}
						value={spacingTop}
						onChange={(value) => setAttributes({ spacingTop: value })}
						min={0}
						max={200}
						step={5}
					/>
					<RangeControl
						label={__('Bottom Spacing (px)', 'em-block-collection')}
						value={spacingBottom}
						onChange={(value) => setAttributes({ spacingBottom: value })}
						min={0}
						max={200}
						step={5}
					/>
				</PanelBody>

				<PanelBody title={__('Divider Settings', 'em-block-collection')} initialOpen={false}>
					<ToggleControl
						label={__('Show Divider', 'em-block-collection')}
						checked={showDivider}
						onChange={(value) => setAttributes({ showDivider: value })}
					/>

					{showDivider && (
						<>
							<SelectControl
								label={__('Divider Style', 'em-block-collection')}
								value={dividerStyle}
								options={[
									{ label: __('Solid', 'em-block-collection'), value: 'solid' },
									{ label: __('Dashed', 'em-block-collection'), value: 'dashed' },
									{ label: __('Dotted', 'em-block-collection'), value: 'dotted' },
									{ label: __('Double', 'em-block-collection'), value: 'double' },
									{ label: __('Groove', 'em-block-collection'), value: 'groove' },
									{ label: __('Ridge', 'em-block-collection'), value: 'ridge' }
								]}
								onChange={(value) => setAttributes({ dividerStyle: value })}
							/>

							<div style={{ marginBottom: '16px' }}>
								<label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>
									{__('Divider Color', 'em-block-collection')}
								</label>
								<ColorPicker
									color={dividerColor}
									onChange={(value) => setAttributes({ dividerColor: value })}
									enableAlpha
								/>
							</div>

							<RangeControl
								label={__('Divider Width (px)', 'em-block-collection')}
								value={dividerWidth}
								onChange={(value) => setAttributes({ dividerWidth: value })}
								min={1}
								max={10}
								step={1}
							/>

							<SelectControl
								label={__('Divider Position', 'em-block-collection')}
								value={dividerPosition}
								options={[
									{ label: __('Top', 'em-block-collection'), value: 'top' },
									{ label: __('Center', 'em-block-collection'), value: 'center' },
									{ label: __('Bottom', 'em-block-collection'), value: 'bottom' }
								]}
								onChange={(value) => setAttributes({ dividerPosition: value })}
							/>

							<RangeControl
								label={__('Divider Length (%)', 'em-block-collection')}
								value={dividerLength}
								onChange={(value) => setAttributes({ dividerLength: value })}
								min={10}
								max={100}
								step={5}
							/>

							<SelectControl
								label={__('Divider Alignment', 'em-block-collection')}
								value={dividerAlignment}
								options={[
									{ label: __('Left', 'em-block-collection'), value: 'left' },
									{ label: __('Center', 'em-block-collection'), value: 'center' },
									{ label: __('Right', 'em-block-collection'), value: 'right' }
								]}
								onChange={(value) => setAttributes({ dividerAlignment: value })}
							/>
						</>
					)}
				</PanelBody>

				<PanelBody title={__('Advanced', 'em-block-collection')} initialOpen={false}>
					<TextControl
						label={__('Custom CSS Class', 'em-block-collection')}
						value={customClass}
						onChange={(value) => setAttributes({ customClass: value })}
						help={__('Add custom CSS classes for additional styling.', 'em-block-collection')}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div style={{ position: 'relative', height: '100%' }}>
					{showDivider && <div style={dividerStyles}></div>}
					<div style={{ 
						textAlign: 'center', 
						color: '#666', 
						fontSize: '14px',
						opacity: 0.7,
						paddingTop: dividerPosition === 'top' && showDivider ? `${dividerWidth + 10}px` : '0',
						paddingBottom: dividerPosition === 'bottom' && showDivider ? `${dividerWidth + 10}px` : '0'
					}}>
						{__('Spacer + Divider', 'em-block-collection')} ({spacingTop + spacingBottom}px)
					</div>
				</div>
			</div>
		</>
	);
}