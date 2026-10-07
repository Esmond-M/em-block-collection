import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const faqs = attributes.faqs || [];
	const blockProps = useBlockProps( {
		className: 'em-faq-accordion is-editor',
	} );

	const addFaq = () => {
		setAttributes( {
			faqs: [ ...faqs, { question: '', answer: '' } ],
		} );
	};

	const updateFaq = ( index, property, value ) => {
		const updatedFaqs = faqs.map( ( faq, idx ) =>
			idx === index ? { ...faq, [ property ]: value } : faq
		);
		setAttributes( { faqs: updatedFaqs } );
	};

	const deleteFaq = ( index ) => {
		const updatedFaqs = faqs.filter( ( _, idx ) => idx !== index );
		setAttributes( { faqs: updatedFaqs } );
	};

	const moveFaq = ( from, to ) => {
		if ( to < 0 || to >= faqs.length ) {
			return;
		}
		const updatedFaqs = [ ...faqs ];
		const [ moved ] = updatedFaqs.splice( from, 1 );
		updatedFaqs.splice( to, 0, moved );
		setAttributes( { faqs: updatedFaqs } );
	};

	return (
		<div { ...blockProps }>
			{ faqs.length === 0 && (
				<div className="faq-empty-state">
					<p>Add your first frequently asked question.</p>
					<Button variant="primary" onClick={ addFaq }>
						Add question
					</Button>
				</div>
			) }
			{ faqs.map( ( faq, idx ) => (
				<div className="faq-item" key={ idx }>
					<div className="faq-item__editor-controls">
						<Button
							icon="arrow-up-alt2"
							label="Move question up"
							showTooltip
							disabled={ idx === 0 }
							onClick={ () => moveFaq( idx, idx - 1 ) }
						/>
						<Button
							icon="arrow-down-alt2"
							label="Move question down"
							showTooltip
							disabled={ idx === faqs.length - 1 }
							onClick={ () => moveFaq( idx, idx + 1 ) }
						/>
						<Button
							icon="trash"
							label="Delete question"
							showTooltip
							isDestructive
							onClick={ () => deleteFaq( idx ) }
						/>
					</div>
					<RichText
						tagName="div"
						className="faq-question faq-question--editor"
						value={ faq.question }
						onChange={ ( value ) =>
							updateFaq( idx, 'question', value )
						}
						placeholder="Write a question"
						allowedFormats={ [] }
					/>
					<RichText
						tagName="div"
						className="faq-answer__inner faq-answer__inner--editor"
						value={ faq.answer }
						onChange={ ( value ) =>
							updateFaq( idx, 'answer', value )
						}
						placeholder="Write the answer"
					/>
				</div>
			) ) }
			{ faqs.length > 0 && (
				<Button
					className="faq-add-button"
					icon="plus-alt2"
					variant="secondary"
					onClick={ addFaq }
				>
					Add question
				</Button>
			) }
		</div>
	);
}
