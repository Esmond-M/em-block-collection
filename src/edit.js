import { useState } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const faqs = attributes.faqs || [];

    const addFaq = () => {
        if (newQuestion && newAnswer) {
            setAttributes({ faqs: [...faqs, { question: newQuestion, answer: newAnswer }] });
            setNewQuestion('');
            setNewAnswer('');
        }
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title="Add FAQ">
                    <TextControl
                        label="Question"
                        value={newQuestion}
                        onChange={setNewQuestion}
                    />
                    <TextControl
                        label="Answer"
                        value={newAnswer}
                        onChange={setNewAnswer}
                    />
                    <Button isPrimary onClick={addFaq}>Add FAQ</Button>
                </PanelBody>
            </InspectorControls>
            <div className="em-faq-accordion">
                {faqs.length === 0 && <p>No FAQs added yet.</p>}
                {faqs.map((faq, idx) => (
                    <div className="faq-item" key={idx}>
                        <strong>{faq.question}</strong>
                        <div>{faq.answer}</div>
                    </div>
                ))}
            </div>
        </>
    );
}
